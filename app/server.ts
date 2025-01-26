import { reactRouter } from "remix-hono/handler";
import { handle } from "hono/cloudflare-pages";
import app from "./main";

import * as build from "../build/server";

// Add the React Router middleware to your Hono server
app.use(
	"*",
	reactRouter({
		build,
		mode: process.env.NODE_ENV as "development" | "production",
		// getLoadContext is optional, the default function is the same as here
		getLoadContext(c) {
			return c.env;
		},
	}),
);

export const onRequest = handle(app);
