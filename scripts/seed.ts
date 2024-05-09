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

        console.log("Seeding Complete")
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the db")
    }
};

main();