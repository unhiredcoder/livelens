import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Database/db.config";


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
            Comment:{
                include:{
                    user:{
                        select:{
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


    return NextResponse.json({status:200,data:post})
}