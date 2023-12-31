import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/Database/db.config";

export async function GET(request: NextRequest) {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ status: 200, message: "Not Authorized" });
    }
 const notifications=await prisma.notification.findMany({
    where:{
        toUser_id:Number(session.user?.id)
    },
    include:{
        user:{
            select:{
                id:true,
                username:true,
                name:true
            }
        }
    }
 })

 return NextResponse.json({status:200,data:notifications})
}