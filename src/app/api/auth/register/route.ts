import { CustomErrorReporter } from '@/validator/CustomErrorReporter'
import { vinejsRegisterSchema } from '@/validator/vinejsRegisterSchema'
import vine, { errors } from '@vinejs/vine'
import { NextRequest, NextResponse } from 'next/server'
import { genSalt, hash } from 'bcryptjs';
import prisma from '@/Database/db.config';


export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        vine.errorReporter = () => new CustomErrorReporter()
        const validator = vine.compile(vinejsRegisterSchema)
        const payload = await validator.validate(data)

        const isEmailExist = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (isEmailExist) {
            return NextResponse.json({
                status: 400, errors: {
                    email: 'Email Already taken,please use another one.'
                }
            })
        }
        const isUsernameExist = await prisma.user.findUnique({
            where: {
                username: payload.username
            }
        })

        if (isUsernameExist) {
            return NextResponse.json({
                status: 400, errors: {
                    username: 'Username Already taken,please use another one.'
                }
            })
        }



        const salt = await genSalt(10)
        payload.password = await hash(payload.password, salt)

        // inserting record in db
        await prisma.user.create({ data: payload })
        return NextResponse.json({ status: 200, message: "Account created successfully!" })
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
            return NextResponse.json({ status: 400, errors: error.messages })
        }
    }
}