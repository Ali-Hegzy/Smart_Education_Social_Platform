import { pipeline } from "@xenova/transformers";

let extractorInstance = null;

async function getExtractor() {
    if (!extractorInstance) {
        extractorInstance = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2",
        );
    }

    return extractorInstance;
}

async function getEmbedding(data) {
    const extractor = await getExtractor();
    const embedding = await extractor(data, {
        pooling: "mean",
        normalize: true,
    });

    const vector = Array.from(embedding.data);
    return vector;
}

function CosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) {
        throw new Error("Vectors must have the same dimension");
    }

    let dotProduct = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
    }

    return dotProduct;
}

export { CosineSimilarity, getEmbedding };
