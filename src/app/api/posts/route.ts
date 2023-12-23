import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validator/CustomErrorReporter";
import { VinejsPostSchema } from "@/validator/VinejsPostSchema";
import prisma from "@/Database/db.config";

export async function POST(request: NextRequest) {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ status: 200, message: "Not Authorized" });
    }

    try {
        const postData = await request.json();
        const data = {
            content: postData.content,
            image: postData.image,
        };
        vine.errorReporter = () => new CustomErrorReporter();
        const validator = vine.compile(VinejsPostSchema);
        const payload = await validator.validate(data);
        // Create a new post in the database
        await prisma.userPosts.create({
            data: {
                content: payload.content,
                user_id: Number(session.user?.id),
                image: data.image ?? null,
            },
        });

        return NextResponse.json({
            status: 200,
            message: "Post created successfully!",
        });
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages);
            return NextResponse.json({ status: 400, errors: error.messages });
        } else {
            console.error(error);
            return NextResponse.json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }
}
