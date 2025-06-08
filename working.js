import * as fs from "fs";

// const filePath = `./images_Home_and_Kitchen_5.json`;
// const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
// const fileJSON = JSON.parse(fileContent);

// const chunks = function (array, size) {
// 	const results = [];
// 	while (array.length) {
// 		results.push(array.splice(0, size));
// 	}
// 	return results;
// };
// const fileChunks = chunks(fileJSON, Math.ceil(fileJSON.length / 5));

// fileChunks.forEach((chunk, index) => {
// 	fs.writeFileSync(`./images_Home_and_Kitchen_${index + 1}_5.json`, JSON.stringify(chunk), { encoding: "utf-8" });
// 	console.log(`Chunk ${index + 1} written successfully.`);
// });
// const res = fs.readdirSync("./").filter((fileName) => fileName.endsWith(".json") && !fileName.startsWith("merged"));
// console.log(res);

// const jsonFiles = res
// 	.map((fileName) => {
// 		const fileContent = fs.readFileSync(fileName, { encoding: "utf-8" });
// 		const fileJSON = JSON.parse(fileContent);

// 		return fileJSON;
// 	})
// 	.flat();

// const mergedJSON = jsonFiles.map((rawFiles) => {
// 	const refFileds = {
// 		images: rawFiles.image,
// 		category: rawFiles.category,
// 		index: rawFiles.index
// 	};
// 	return refFileds;
// });

// // fs.writeFileSync("./mergedImages.json", JSON.stringify(mergedJSON), { encoding: "utf-8" });

// console.log("Merged JSON file created successfully with", mergedJSON.length, "entries.");

// const mf = fs.readFileSync("./mergedImages.json", { encoding: "utf-8" });
// const mfJSON = JSON.parse(mf);

// console.log("Merged JSON file has", mfJSON.length, "entries.");

const writeImges = async function ({ images: imageURLArr, category: catName, index }) {
	console.log({ imageURLArr, catName, index });
};

const res = fs.readFileSync("./mergedImages.json", { encoding: "utf-8" });

const mergedJSON = JSON.parse(res);
for (let i = 0; i < 10; i++) {
	const thisObject = mergedJSON[i];
	await writeImges(thisObject);
}
