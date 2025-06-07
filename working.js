import * as fs from "fs";

const filePath = `./images_Home_and_Kitchen_5.json`;
const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
const fileJSON = JSON.parse(fileContent);

const chunks = function (array, size) {
	const results = [];
	while (array.length) {
		results.push(array.splice(0, size));
	}
	return results;
};
const fileChunks = chunks(fileJSON, Math.ceil(fileJSON.length / 5));

fileChunks.forEach((chunk, index) => {
	fs.writeFileSync(`./images_Home_and_Kitchen_${index + 1}_5.json`, JSON.stringify(chunk), { encoding: "utf-8" });
	console.log(`Chunk ${index + 1} written successfully.`);
});
