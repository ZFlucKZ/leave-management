import * as z from 'zod';

export function getImagePath(file?: string | null) {
  if (!file) return;

  try {
    z.string().url().parse(file);
    return;
  } catch {
    return `/upload/${file}`;
  }
}
