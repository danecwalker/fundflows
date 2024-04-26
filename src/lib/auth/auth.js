import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { fromEnv } from '@aws-sdk/credential-providers';
import { env } from '$env/dynamic/private';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { dev } from '$app/environment';

const rdsClient = new RDSDataClient({
    credentials: fromEnv(),
    region: 'us-east-1',
});

const db = drizzle(rdsClient, {
  database: env.DATABASE || '',
  secretArn: env.SECRET_ARN || '',
  resourceArn: env.RESOURCE_ARN || '',
});

const userTable = pgTable("user", {
	id: text("id").primaryKey()
});

const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
});