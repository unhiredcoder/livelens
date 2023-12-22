import { CustomErrorReporter } from '@/validator/CustomErrorReporter'; // Fix typo
import vine, { errors } from '@vinejs/vine';
import { NextRequest, NextResponse } from 'next/server';
import { compare} from 'bcryptjs'; 
import prisma from '@/Database/db.config';
import { vinejsLoginSchema } from '@/validator/vinejsLoginSchema';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        vine.errorReporter = () => new CustomErrorReporter(); 
        const validator = vine.compile(vinejsLoginSchema);
        const payload = await validator.validate(data);

        const isUserExist = await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });

        if (!isUserExist) {
            return NextResponse.json({
                status: 400,
                errors: {
                    email: 'No account found with this email ',
                },
            });
        }

        // Check for password match in the database
        const isPasswordCorrect = await compare(payload.password, isUserExist.password!);

        if (isPasswordCorrect) {
            return NextResponse.json({ status: 200, message: 'User Logged In Successfully' });
        }
        return NextResponse.json({
            status: 400, errors: {
                email: 'Invalid email or password'
            }
        });

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages);
            return NextResponse.json({ status: 400, errors: error.messages });
        } else {
            console.error(error);
            return NextResponse.json({ status: 500, message: 'Internal Server Error' });
        }
    }
}
