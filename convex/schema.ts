import { s, defineSchema, defineTable } from "convex/schema";

const schema = defineSchema({
    "files": defineTable({
        name: s.string(),
        storageId: s.string()
    })
});

export default schema;