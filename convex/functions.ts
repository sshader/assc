import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateFile = mutation({args: { storageId: v.string(), name: v.string() }, handler: async ({ db, storage }, { storageId, name }) => {
    const existingFile = await db.query("files").filter(q => q.eq(q.field("name"), name)).unique();
    if (existingFile === null) {
        await db.insert("files", { storageId, name });
    } else {
        await storage.delete(existingFile.storageId);
        await db.patch(existingFile._id, { storageId });
    }
}});


export const getFile = query({ args: { name: v.string() }, handler : async ({ db }, { name }) => {
    const existingFile = await db.query("files").filter(q => q.eq(q.field("name"), name)).unique();
    return existingFile?.storageId;
}});