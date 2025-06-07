import * as fs from "fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const writeImges = async function (imageURLArr, catName, index) {
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
				console.error(`Error fetching image ${imageName}:`, err);
				errorImges.push(imageName);
				fs.writeFileSync("./errorImages.txt", errorImges.join("\n"), { encoding: "utf-8" });
			}
		}
	}
};

const res = fs.readdirSync("./").filter((fileName) => fileName.endsWith(".json"));

const jsonFiles = res
	.map((fileName) => {
		const fileContent = fs.readFileSync(fileName, { encoding: "utf-8" });
		const fileJSON = JSON.parse(fileContent);

		return fileJSON;
	})
	.flat();

const mergedJSON = jsonFiles.map((rawFiles) => {
	const refFileds = {
		images: rawFiles.image,
		category: rawFiles.category,
		index: rawFiles.index
	};
	return refFileds;
});

const errorImges = [];
for (let i = 0; i < mergedJSON.length; i++) {
	const { images, category, index } = mergedJSON[i];
	await writeImges(images, category, index);
	await sleep(500 + Math.floor(Math.random() * 500)); // Sleep for 0.5 to 1 second
	console.log(`Processed ${i + 1}/${mergedJSON.length} images.`);
}
