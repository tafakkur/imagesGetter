import * as fs from "fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const writeImges = async function ({ images: imageURLArr, category: catName, index }) {
	for (let i = 0; i < imageURLArr.length; i++) {
		const imageURL = imageURLArr[i];
		const splits = imageURL.split(".");
		const ext = splits[splits.length - 1].toLowerCase();
		const imageName = imageURLArr.length > 1 ? `${index}_${charset[i]}.${ext}` : `${index}.${ext}`;
		if (fs.existsSync(`./Images/${catName}/${imageName}`)) {
			console.log(`Image ${imageName} already exists, skipping...`);
			continue;
		} else {
			try {
				const imageData = await fetch(imageURL)
					.then((res) => res.arrayBuffer())
					.then((buffer) => Buffer.from(buffer));
				fs.writeFileSync(`./Images/${catName}/${imageName}`, imageData, { encoding: "binary" });

				console.log(`Image ${imageName} saved successfully.`);
			} catch (error) {
				console.error(`Error fetching image ${imageName}:`, error);
				errorImges.push({ images: imageURLArr, category: catName, index });
				fs.writeFileSync("./errorImages.txt", JSON.stringify(errorImges), { encoding: "utf-8" });
			}
			await sleep(500 + Math.floor(Math.random() * 500));
		}
	}
};

const res = fs.readFileSync("./mergedImages.json", { encoding: "utf-8" });

const mergedJSON = JSON.parse(res);

const errorImges = [];

for (let i = 0; i < mergedJSON.length; i++) {
	const thisObject = mergedJSON[i];
	await writeImges(thisObject);

	console.log(`Processed ${i + 1}/${mergedJSON.length} images.`);
}
