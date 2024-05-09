"use server"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server"

import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { getCourseById, getUserProgress } from "@/db/queries";

export const upsertUserProgress = async (courseId:number) => {
    const { userId } =await auth();
    const user = await currentUser();
    if(!userId || !user){
        throw new Error("Unauthorized");
    }
    const course = await getCourseById(courseId);
    if(!course){
        throw new Error("Course not found")
    }
    //TODO after ading the units and lessons in the table
    // if(!course.units.length || !course.units[0].lessons.length){
    //     throw new Error("Course is Empty")
    // }
    const existingUserProgress = await getUserProgress();
    if(existingUserProgress){
        await db.update(userProgress).set({
            activeCourseId:courseId,
            userName: user.fullName || "User Name",
            userImageSrc: user.imageUrl || "/assets/logo.svg",
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }
    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName: user.fullName || "User Name",
      userImageSrc: user.imageUrl || "/assets/logo.svg",
    });
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn")
}