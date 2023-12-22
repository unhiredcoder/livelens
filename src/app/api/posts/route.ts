// import { NextRequest, NextResponse } from "next/server";
// import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
// import { getServerSession } from "next-auth";
// import vine, { errors } from "@vinejs/vine";
// import { CustomErrorReporter } from "@/validator/CustomErrorReporter";
// import { VinejsPostSchema } from "@/validator/VinejsPostSchema";
// import { Imagevalidator } from "@/validator/ImageValidator";
// import { join } from "path";
// import { getRandomNumber } from "@/lib/utils";
// import { writeFile } from "fs/promises";
// import prisma from "@/Database/db.config";


// export async function POST(request: NextRequest) {
//     const session: CustomSession | null = await getServerSession(authOptions)
//     if (!session) {
//         return NextResponse.json({ status: 200, message: "Not Authorized" })
//     }

//     try {
//         const data = await request.json(); // Use request.json() instead of request.formData()

//         vine.errorReporter = () => new CustomErrorReporter()
//         const validator = vine.compile(VinejsPostSchema)
//         const payload = await validator.validate(data);

//         let imageString: string | null = null;

//         if (data.image) {
//             // const isImageNotValid = Imagevalidator(data.image.name);
//             // if (isImageNotValid) {
//             //     return NextResponse.json({
//             //         status: 400,
//             //         errors: {
//             //             content: isImageNotValid
//             //         }
//             //     });
//             // }


//                 imageString = data.image

//         }

//         await prisma.userPosts.create({
//             data: {
//                 content: payload.content,
//                 user_id: Number(session.user?.id),
//                 image: imageString ?? null,
//             },
//         });

//         return NextResponse.json({
//             status: 200,
//             message: "Post created successfully!",
//         });

//     } catch (error) {
//         if (error instanceof errors.E_VALIDATION_ERROR) {
//             console.log(error.messages);
//             return NextResponse.json({ status: 400, errors: error.messages });
//         } else {
//             console.error(error);
//             return NextResponse.json({ status: 500, message: 'Internal Server Error' });
//         }
//     }
// }
















import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validator/CustomErrorReporter";
import { VinejsPostSchema } from "@/validator/VinejsPostSchema";
import { Imagevalidator } from "@/validator/ImageValidator";
import { join } from "path";
import { getRandomNumber } from "@/lib/utils";
import { writeFile, unlink } from "fs/promises";
import cloudinary from "cloudinary";
import prisma from "@/Database/db.config";

// Configure Cloudinary with your credentials
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ status: 200, message: "Not Authorized" });
    }

    try {
        const formData = await request.formData();
        const data = {
            content: formData.get("content"),
            image: "",
        };

        vine.errorReporter = () => new CustomErrorReporter();
        const validator = vine.compile(VinejsPostSchema);
        const payload = await validator.validate(data);

        const image = formData.get("image") as File | null;
        if (image) {
            const isImageNotValid = Imagevalidator(image.name);
            if (isImageNotValid) {
                return NextResponse.json({
                    status: 400,
                    errors: {
                        content: {
                            isImageNotValid,
                        },
                    },
                });
            }

            try {
                const buffer = Buffer.from(await image!.arrayBuffer());
                const uploadDir = join(process.cwd(), "public", "/uploads");
                const uniqueName = Date.now() + "_" + getRandomNumber(1, 999999);
                const imgExt = image?.name.split(".");
                const filename = uniqueName + "." + imgExt?.[1];
                const filePath = `${uploadDir}/${filename}`;

                // Save the file to the local uploads directory
                await writeFile(filePath, buffer);

                // Upload the image to Cloudinary
                const cloudinaryUploadResponse = await cloudinary.v2.uploader.upload(filePath);

                // Get the secure URL from the Cloudinary response
                data.image = cloudinaryUploadResponse.secure_url;

                // Delete the file from the local uploads directory
                await unlink(filePath);
            } catch (error) {
                return NextResponse.json({
                    status: 500,
                    message: "Something went wrong. Please try again later.",
                });
            }
        }

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
