export const slugify = (str: string) => {
  const result = str
    .replace(/^\s+|\s+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9ก-๛ -]/, '')
    .replace(/\s+/, '-')
    .replace(/-+/g, '-');

  return result;
};

// title: how To use กขค
// slug : how-to-use-trpc
