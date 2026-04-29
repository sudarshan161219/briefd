import slugify from "slugify";
import { nanoid } from "nanoid";

export const generateSlug = (name: string) => {
  const baseSlug = slugify.default(name, { lower: true, strict: true });
  const suffix = nanoid(5);
  const slug = `${baseSlug}-${suffix}`;
  return slug;
};
