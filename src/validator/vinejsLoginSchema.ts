import vine from '@vinejs/vine'

export const vinejsLoginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string()
})
