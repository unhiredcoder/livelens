import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/Database/db.config";


export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    const users = await prisma.user.findUnique({
        where: {
            id: Number(params.id)
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,

            post: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                        }
                    }
                }
            },
             Comment: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                        }
                    }
                }
            }
        }


    })

}