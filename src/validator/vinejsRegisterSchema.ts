import vine from '@vinejs/vine'

export const vinejsRegisterSchema = vine.object({
    username: vine.string().minLength(2).maxLength(10),
    name: vine.string().minLength(3).maxLength(60),
    email: vine.string().email(),
    password: vine
        .string()
        .minLength(6)
        .maxLength(32)
        .confirmed()
})
