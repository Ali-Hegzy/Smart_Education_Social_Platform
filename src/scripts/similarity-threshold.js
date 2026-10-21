import techRef from "../../refrence/tech.json" with { type: "json" };
import testCases from "../../test/fixtures/similarity-benchmark/test.json" with { type: "json" };
import {
    CosineSimilarity,
    getEmbedding,
} from "../services/pipeline.service.js";

let refEmbedeed = [];
for (let i = 0; i < techRef.length; i++) {
    refEmbedeed[i] = await getEmbedding(techRef[i].text);
}

let result = [];

for (let i = 0; i < testCases.length; i++) {
    const testVec = await getEmbedding(testCases[i].text);
    let tempMax = null;
    let tempMin = null;

    for (let j = 0; j < refEmbedeed.length; j++) {
        let score = CosineSimilarity(testVec, refEmbedeed[j]);

        if (j === 0) {
            tempMax = tempMin = score;
        } else {
            if (score > tempMax) {
                tempMax = score;
            } else if (score < tempMin) {
                tempMin = score;
            }
        }
    }

    result.push({
        text: testCases[i].text,
        max: tempMax,
        min: tempMin,
        isTech: testCases[i].isTech,
    });
}
const tempTech = result.filter((e) => e.isTech);
const tempNonTech = result.filter((e) => !e.isTech);

const maxTech = Math.max(...tempTech.map((e) => e.max));
const minTech = Math.min(...tempTech.map((e) => e.max));

const maxNonTech = Math.max(...tempNonTech.map((e) => e.max));
const minNonTech = Math.min(...tempNonTech.map((e) => e.max));

console.log(`=====================================`);
console.log(`Max num in Tech : ${maxTech}`);
console.log(`Min num in Tech : ${minTech}`);
console.log(`Max num in Non-Tech : ${maxNonTech}`);
console.log(`Min num in Non-Tech : ${minNonTech}`);
console.log(`=====================================`);

/**
 * The result is :
 * =====================================
 * Max num in Tech : 0.912985201017433
 * Min num in Tech : 0.3012243670625794
 * Max num in Non-Tech : 0.28622678693653886
 * Min num in Non-Tech : 0.09844192768185694
 * =====================================
 * So the threshold is calculated to be ((0.30122436 + 0.28622678) / 2) = 0.29372557
 */
