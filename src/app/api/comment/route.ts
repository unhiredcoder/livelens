    import { NextRequest, NextResponse } from "next/server";
    import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
    import { getServerSession } from "next-auth";
    import { CustomErrorReporter } from "@/validator/CustomErrorReporter";
    import vine, { errors } from "@vinejs/vine";
    import { VinejsCommentSchema } from "@/validator/VinejsCommentSchema";
    import prisma from "@/Database/db.config";




export async function GET(request: NextRequest) {
    try {
        const postId = request.nextUrl.searchParams.get("post_id");
        
        if (!postId) {
            return NextResponse.json({ 
                error: "Post ID is required" 
            }, { status: 400 });
        }

        const comments = await prisma.comment.findMany({
            where: {
                post_id: parseInt(postId),
            },
            include: {
                user: {
                    select: {
                        name: true
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return NextResponse.json({ 
            comments,
            status: 200 
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json(
            { 
                error: "Failed to fetch comments",
                status: 500 
            },
            { status: 500 }
        );
    }
}










    export async function POST(request: NextRequest) {

        const data = await request.json()
    try {
        const session: CustomSession | null = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ status: 200, message: "Not Authorized" });
        }

        vine.errorReporter = () => new CustomErrorReporter();
        const validator = vine.compile(VinejsCommentSchema);
        const payload = await validator.validate(data);

        await prisma.post.update({
            where: {
                id: Number(payload.post_id)
            },
            data: {
                comment_count: {
                    increment: 1,
                }
            }
        })

        //  add notificaion

        await prisma.notification.create({
            data: {
                user_id: Number(session.user?.id),
                toUser_id: Number(payload.toUser_id),
                content: "Commented on your post"
            }
        })

        // add comments in db
        await prisma.comment.create({
            data: {
                user_id: Number(session.user?.id),
                post_id: Number(payload.post_id),
                content: payload.content
            }
        })

        return NextResponse.json({
            status: 200,
            message: "Comment added successfully!",
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