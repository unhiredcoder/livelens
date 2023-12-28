import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Database/db.config";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";





export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const session: CustomSession | null = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ status: 500, message: "Un-Authorized" })
    }

    const findComment = await prisma.comment.findFirst({
        where: {
            id: Number(params.id),
            user_id: Number(session?.user?.id)
        }
    })

    if (!findComment) {
        return NextResponse.json({ status: 400, message: "Bad request" })
    }

    await prisma.comment.delete({
        where:{
            id:Number(params.id)
        }
    })

    return NextResponse.json({status:200,message:'Comment Deleted successfully!'})

}