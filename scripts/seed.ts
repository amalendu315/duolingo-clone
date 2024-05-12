import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql,{schema})

const main = async () => {
    try {
        console.log("Seeding the db");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress)

        await db.insert(schema.courses).values([
          {
            id: 1,
            title: "Spanish",
            imageSrc: "/assets/spanish.svg",
          },
          {
            id: 2,
            title: "English",
            imageSrc: "/assets/english.svg",
          },
          {
            id: 3,
            title: "Croatian",
            imageSrc: "/assets/croatian.svg",
          },
          {
            id: 4,
            title: "German",
            imageSrc: "/assets/german.svg",
          },
          {
            id: 5,
            title: "Italian",
            imageSrc: "/assets/italian.svg",
          },
        ]);

        await db.insert(schema.units).values([
          {
            id: 1,
            courseId: 1,
            title: "Unit 1",
            description: "Learn the basics of Spanish",
            order: 1,
          },
        ]);

        await db.insert(schema.lessons).values([
          {
            id: 1,
            unitId: 1,
            order: 1,
            title: "Nouns",
          },
          {
            id: 2,
            unitId: 1,
            order: 2,
            title: "Pronouns",
          },
          {
            id: 3,
            unitId: 1,
            order: 3,
            title: "Verbs",
          },
          {
            id: 4,
            unitId: 1,
            order: 4,
            title: "Adjectives",
          },
          {
            id: 5,
            unitId: 1,
            order: 5,
            title: "Tenses",
          },
        ]);

        await db.insert(schema.challenges).values([
          {
            id: 1,
            lessonId: 1,
            type: "SELECT",
            order: 1,
            question: 'Which one of these is the "the man"?',
          },
          {
            id: 2,
            lessonId: 1,
            type: "ASSIST",
            order: 2,
            question: '"the man"?',
          },
          {
            id: 3,
            lessonId: 1,
            type: "SELECT",
            order: 3,
            question: 'Which on of these is the "the robot"?',
          },
          {
            id: 4,
            lessonId: 2,
            type: "SELECT",
            order: 4,
            question: 'Which one of these is the "the man"?',
          },
          {
            id: 5,
            lessonId: 2,
            type: "ASSIST",
            order: 5,
            question: '"the man"?',
          },
          {
            id: 6,
            lessonId: 2,
            type: "SELECT",
            order: 6,
            question: 'Which on of these is the "the robot"?',
          },
        ]);

        await db.insert(schema.challengeOptions).values([
          {
            challengeId: 1,
            imageSrc: "/assets/man.svg",
            correct: true,
            text: "el hombre",
            audioSrc: "/es_man.mp3",
          },
          {
            challengeId: 1,
            imageSrc: "/assets/woman.svg",
            correct: false,
            text: "la mujer",
            audioSrc: "/es_woman.mp3",
          },
          {
            challengeId: 1,
            imageSrc: "/assets/robot.svg",
            correct: false,
            text: "el robot",
            audioSrc: "/es_robot.mp3",
          },
          {
            challengeId: 2,
            correct: true,
            text: "el hombre",
            audioSrc: "/es_man.mp3",
          },
          {
            challengeId: 2,
            correct: false,
            text: "la mujer",
            audioSrc: "/es_woman.mp3",
          },
          {
            challengeId: 2,
            correct: false,
            text: "el robot",
            audioSrc: "/es_robot.mp3",
          },
          {
            challengeId: 3,
            imageSrc: "/assets/man.svg",
            correct: false,
            text: "el hombre",
            audioSrc: "/es_man.mp3",
          },
          {
            challengeId: 3,
            imageSrc: "/assets/woman.svg",
            correct: false,
            text: "la mujer",
            audioSrc: "/es_woman.mp3",
          },
          {
            challengeId: 3,
            imageSrc: "/assets/robot.svg",
            correct: true,
            text: "el robot",
            audioSrc: "/es_robot.mp3",
          },
        ]);

        console.log("Seeding Complete")
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the db")
    }
};

main();