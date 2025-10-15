"use server";

import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
    const blogInfo = Object.fromEntries(data.entries());
    const session = await getServerSession(authOptions);
    const userID = session?.user.id

    const modifiedData = {
        ...blogInfo,
        tags: blogInfo.tags
            .toString()
            .split(",")
            .map((tag) => tag.trim()),
        authorId: userID,
        isFeatured: Boolean(blogInfo.isFeatured),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedData),
    });

    const result = await res.json();

    if (result?.id) {
        revalidateTag("BLOGS");
        revalidatePath("/blogs");
        redirect("/");
    } else {
        console.error(result)
    }
    return result;
};