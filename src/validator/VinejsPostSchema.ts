import vine from "@vinejs/vine";

export const VinejsPostSchema = vine.object({
  content: vine.string().trim().minLength(10),
});