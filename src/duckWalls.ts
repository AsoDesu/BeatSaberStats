//
//  This script generates Duck Walls
//

import fs from "fs";
import { BSMap, Info, notesObj, percentsObj } from "./types";

var mapsWithDuckWalls = 0;
var totalWalls = 0;
var totalDuckWalls = 0;

let path = `D:/maps`;

var maps = fs.readdirSync(path + "/");

for (let i = 0; i < maps.length; i++) {
	const map = maps[i];

	console.log(`Parsing Map ${map}!`);
	let info = JSON.parse(fs.readFileSync(`${path}/${map}/info.dat`, { encoding: "utf-8" })) as Info;
	let hasDuckWall = false;

	info._difficultyBeatmapSets.forEach((char) => {
		char._difficultyBeatmaps.forEach((diff) => {
			let diffData = JSON.parse(fs.readFileSync(`${path}/${map}/${diff._beatmapFilename}`, { encoding: "utf-8" })) as BSMap;

			diffData._obstacles.forEach((wall) => {
				totalWalls++;
				if (wall._type == 1 && (wall._width == 4 || (wall._lineIndex == 1 && wall._width == 2))) {
					totalDuckWalls++;
					hasDuckWall = true;
				}
			});
		});
	});

	if (hasDuckWall) mapsWithDuckWalls++;
	console.log(`Parsed Map ${map}! ${i}/${maps.length}`);
}

fs.writeFileSync("out/duckWalls.json", JSON.stringify({ totalDuckWalls, mapsWithDuckWalls: ((mapsWithDuckWalls / maps.length) * 100).toFixed(2) }, null, 2));
