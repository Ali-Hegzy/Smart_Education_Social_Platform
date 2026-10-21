import * as z from "zod";
import {
    CosineSimilarity,
    getEmbedding,
} from "../services/pipeline.service.js";
import techRef from "../../refrence/tech.json" with { type: "json" };

const schema = z.object({
    title: z.string(),
    description: z.string(),
    image_path: z.string(),
});

const checkSchema = (req, res, next) => {
    const check = schema.safeParse(req.body);

    if (!check.success) {
        return res.status(400).json({
            error: "Schema Failed",
            message: check.error.message,
        });
    }

    next();
};

let refEmbedeed = [];
for (let i = 0; i < techRef.length; i++) {
    refEmbedeed[i] = await getEmbedding(techRef[i].text);
}
let temp = null;
const threshold = 0.29372557;

const semanticCheck = async (req, res, next) => {
    const desc = await getEmbedding(req.body.description);

    for (let i = 0; i < refEmbedeed.length; i++) {
        let score = CosineSimilarity(desc, refEmbedeed[i]);

        if (i === 0) {
            temp = score;
        } else {
            if (score > temp) {
                temp = score;
            }
        }
    }

    if (temp < threshold) {
        return res.status(400).json({
            error: "Semantic check Failed",
            message: "Your post description is not a technical related",
        });
    }

    next();
};

export { checkSchema, semanticCheck };
