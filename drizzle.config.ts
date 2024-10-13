import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
    out: "./drizzle",
    schema: "./src/server/db/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString: env.DATABASE_URL,
    },
    tablesFilter: ["Trello-Clone_*"],
} satisfies Config;
