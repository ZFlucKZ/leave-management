############## Dockerfile > image > container

##### DEPEMDEMCIES

FROM --platform=linux/amd64 node:18-alpine3.16 AS deps
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

# Install denpendencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
  if [ -f yarn.lock]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json]; then npm ci; \
  elif [ -f pnpm-lock.yaml]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not Found." && exit 1; \
  fi



##### BUILDER

FROM --platform=linux/amd64 node:18-alpine3.16 AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock]; then SKIP_ENV_VALIDATION=1 yarn db:deploy && yarn build; \
  elif [ -f package-lock.json]; then SKIP_ENV_VALIDATION=1 npm run db:deploy && npm run build; \
  elif [ -f pnpm-lock.yaml]; then yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run db:deploy && pnpm run build; \
  else echo "Lockfile not Found." && exit 1; \
  fi



##### RUNNER

FROM --platform=linux/amd64 node:18-alpine3.16 AS runner
WORKDIR /app

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standaline ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]