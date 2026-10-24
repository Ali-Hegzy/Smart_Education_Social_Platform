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
const THRESHOLD = 0.29372557;

function semanticCheck(contentKey, message) {
    return async (req, res, next) => {
        try {
            if (!req.body || !req.body[contentKey]) {
                const devError = new Error(
                    `Developer Error: Missing key '${contentKey}' in request body`,
                );
                devError.status = 400;
                return next(devError);
            }

            let temp = null;
            const content = await getEmbedding(req.body[contentKey]);

            for (let i = 0; i < refEmbedeed.length; i++) {
                let score = CosineSimilarity(content, refEmbedeed[i]);

                if (i === 0) {
                    temp = score;
                } else {
                    if (score > temp) {
                        temp = score;
                    }
                }
            }

            if (temp < THRESHOLD) {
                return res.status(400).json({
                    error: "Semantic check Failed",
                    message,
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

const semanticDescCheck = semanticCheck(
    "description",
    "Your post description is not a technical related",
);

const semanticTitleCheck = semanticCheck(
    "title",
    "Your post title is not a technical related",
);

export { checkSchema, semanticDescCheck, semanticTitleCheck };
