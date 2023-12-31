import vine from "@vinejs/vine";

export const VinejsCommentSchema = vine.object({
  content: vine.string().trim().minLength(10),
  post_id:vine.number(),
  toUser_id:vine.number()

});