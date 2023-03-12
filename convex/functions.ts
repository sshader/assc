import { mutation, query } from "./_generated/server";

export const updateFile = mutation(async ({ db, storage }, storageId, name) => {
    const existingFile = await db.query("files").filter(q => q.eq(q.field("name"), name)).unique();
    if (existingFile === null) {
        await db.insert("files", { storageId, name });
    } else {
        await storage.delete(existingFile.storageId);
        await db.patch(existingFile._id, { storageId });
    }
});


export const getFile = query(async ({ db }, name) => {
    const existingFile = await db.query("files").filter(q => q.eq(q.field("name"), name)).unique();
    return existingFile?.storageId;
});