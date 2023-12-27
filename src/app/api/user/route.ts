import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/Database/db.config";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";


export async function GET(request: NextRequest) {
    const session: CustomSession| null = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ status: 500, message: "Un-Authorized" })
    }
    const users = await prisma.user.findMany({
        where: {
           NOT:{
            id: Number(session.user?.id)
           }
        },
        select: {
            id: true,
            name: true,
            username: true,
        }
    
    })

    return NextResponse.json({ status: 200, data: users })

}