import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Database/db.config";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(params.id)
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true
                }
            },
            Comment: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true
                        }
                    }
                }
            }
        }
    }
    )


    return NextResponse.json({ status: 200, data: post })
}


export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const session: CustomSession | null = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ status: 500, message: "Un-Authorized" })
    }

    const findPost = await prisma.post.findFirst({
        where: {
            id: Number(params.id),
            user_id: Number(session?.user?.id)
        }
    })

    if (!findPost) {
        return NextResponse.json({ status: 400, message: "Bad request" })
    }

    // if (findPost.image != "" && findPost.image != null) {}

    await prisma.post.delete({
        where:{
            id:Number(params.id)
        }
    })

    return NextResponse.json({status:200,message:'Post Deleted successfully!'})

}