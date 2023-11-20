import { HonoWithConvex, HttpRouterWithHono } from "./lib/honoWithConvex";
import { Hono } from "hono";
import { logger } from "hono/logger";
import stripAnsi from "strip-ansi";
import { api } from "./_generated/api"

const app: HonoWithConvex = new Hono();

app.use(
    "*",
    logger((...args) => {
        console.log(...args.map(stripAnsi));
    })
);

app.post("/uploadFile", async c => {
    const fileName = c.req.query("name")!;
    const storageId = await c.env.storage.store(await c.req.blob());
    await c.env.runMutation(api.functions.updateFile, { storageId, name: fileName });
    return c.text("success", 200);
});

app.get("*", async c => {
    const path = new URL(c.req.url).pathname;
    // Remove leading slash from path
    const fileName = path === "/" ? "index.html" : path.slice(1);
    const storageIdOrNull = await c.env.runQuery(api.functions.getFile, { name: fileName });
    if (storageIdOrNull === null) {
        return c.text("couldn't find file :(", 404);
    } else {
        const blob = await c.env.storage.get(storageIdOrNull);
        return new Response(blob)
    }
});


// add Hono routes on `app`
export default new HttpRouterWithHono(app);