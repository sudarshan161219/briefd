import slugify from "slugify";
import { nanoid } from "nanoid";

export const generateSlug = (name: string) => {
  let baseSlug = slugify.default(name, { lower: true, strict: true });
  if (!baseSlug) {
    baseSlug = "brief";
  }
  const suffix = nanoid(5);
  const slug = `${baseSlug}-${suffix}`;
  return slug;
};
