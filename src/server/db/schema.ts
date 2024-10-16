import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `trello_${name}`);

export const boards = createTable(
  "boards",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    color: varchar("color", { length: 256 }).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull().references(() => users.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", {withTimezone: true}).$onUpdate(() => new Date()),
  },
  // (example) => ({
  //   createdByIdIdx: index("createdById_idx").on(example.createdById),
  //   nameIndex: index("name_idx").on(example.name),
  // })
);

export const lists = createTable("lists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  boardId: integer("board_id").notNull(),
  position: integer("position").notNull(),
  createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
      updatedAt: timestamp("updatedAt", {withTimezone: true}).$onUpdate(() => new Date()),
},
  (table) => ({
    boardIdx: index("board_idx").on(table.boardId)
  })
);

export const tasks = createTable("tasks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  listId: integer("list_id").notNull(),
  description: varchar("description", { length: 255 }),
  position: integer("position").notNull(),
  createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
      updatedAt: timestamp("updatedAt", {withTimezone: true}).$onUpdate(() => new Date()),
},
  (table) => ({
    listIdx: index("list_idx").on(table.listId)
  })
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
