import { HonoWithConvex, HttpRouterWithHono } from "./lib/honoWithConvex";
import { Hono } from "hono";
import { logger } from "hono/logger";
import stripAnsi from "strip-ansi";

const app: HonoWithConvex = new Hono();

app.use(
    "*",
    logger((...args) => {
        console.log(...args.map(stripAnsi));
    })
);

app.post("/uploadFile", async c => {
    const fileName = c.req.query("name");
    // @ts-expect-error --  no storage yet   
    const storageId = await c.env.storage.store(c.req);
    await c.env.runMutation("functions:updateFile", storageId, fileName);
    return c.text("success", 200);
});

app.get("*", async c => {
    const path = new URL(c.req.url).pathname;
    // Remove leading slash from path
    const fileName = path === "/" ? "index.html" : path.slice(1);
    const storageIdOrNull = await c.env.runQuery("functions:getFile", fileName);
    if (storageIdOrNull === null) {
        return c.text("couldn't find file :(", 404);
    } else {
        // @ts-expect-error --  no storage yet
        return await c.env.storage.get(storageIdOrNull);
    }
});


// add Hono routes on `app`
export default new HttpRouterWithHono(app);