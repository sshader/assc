import { defineSchema, defineTable } from "convex/server";
import { v} from "convex/values"

const schema = defineSchema({
    "files": defineTable({
        name: v.string(),
        storageId: v.string()
    })
});

export default schema;