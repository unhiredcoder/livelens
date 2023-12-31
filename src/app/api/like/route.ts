import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/Database/db.config";

export async function POST(request: NextRequest) {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ status: 200, message: "Not Authorized" });
    }
    
    const payload = await request.json();

    if (!payload.post_id || !payload.toUser_id || typeof payload.status !== "string") {
        return NextResponse.json({ status: 400, message: "Bad request" });
    }

    try {
        const postId = Number(payload.post_id);
        const toUserId = Number(payload.toUser_id);
        const userId = Number(session?.user?.id);

        if (payload.status === "1") {
            // Add notification
            await prisma.notification.create({
                data: {
                    user_id: userId,
                    toUser_id: toUserId,
                    content: "Liked your post!"
                }
            });

            // Add like count
            await prisma.post.update({
                where: { id: postId },
                data: { likes_count: { increment: 1 } }
            });

            // Add entry in likes table
            await prisma.likes.create({
                data: { post_id: postId, user_id: userId }
            });
        } else if (payload.status === "0") {
            // Decrement like count
            await prisma.post.update({
                where: { id: postId },
                data: { likes_count: { decrement: 1 } }
            });

            // Delete entry from likes table
            await prisma.likes.deleteMany({
                where: { post_id: postId, user_id: userId }
            });
        }

        return NextResponse.json({ status: 200, message: payload.status === "1" ? "post liked" : "post disliked" });
    } catch (error) {
        console.error("Error in database operation:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}
