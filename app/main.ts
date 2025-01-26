import { Hono } from "hono";
import { serve } from '@hono/node-server'

/* type your Cloudflare bindings here */
type Bindings = {
  KV: KVNamespace;
};

/* type your Hono variables (used with c.get/c.set) here */
type Variables = {
  KV: KVNamespace;
};

type ContextEnv = { Bindings: Bindings; Variables: Variables };

const app = new Hono<ContextEnv>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", (c) => {
  return c.json({ 
    users: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ] 
  });
});

serve({...app,
  port: 4000,
}, (i) => {
  console.log(`Server is running on http://localhost:${i.port}`);
});

export default app;
