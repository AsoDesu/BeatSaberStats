//
//  This script generates Most Used Bombs
//

import fs from "fs";
import { BSMap, Info, notesObj, percentsObj } from "./types";

var notes: notesObj = {};
var percents: percentsObj = {};
var totalNotes = 0;

let path = `D:/maps`;

var maps = fs.readdirSync(path + "/");

for (let i = 0; i < maps.length; i++) {
	const map = maps[i];

	console.log(`Parsing Map ${map}!`);
	let info = JSON.parse(fs.readFileSync(`${path}/${map}/info.dat`, { encoding: "utf-8" })) as Info;

	info._difficultyBeatmapSets.forEach((char) => {
		char._difficultyBeatmaps.forEach((diff) => {
			let diffData = JSON.parse(fs.readFileSync(`${path}/${map}/${diff._beatmapFilename}`, { encoding: "utf-8" })) as BSMap;

			diffData._notes.forEach((note) => {
				if (note._type != 3) return;
				let i = `${note._lineIndex}-${note._lineLayer}`;
				let amount = 0;
				if (notes[i]) amount = notes[i];
				amount++;
				totalNotes++;

				notes[i] = amount;
			});
		});
	});

	console.log(`Parsed Map ${map}! ${i}/${maps.length}`);
}

Object.keys(notes).forEach((key) => {
	percents[key] = ((notes[key] / totalNotes) * 100).toFixed(4);
});

fs.writeFileSync("out/mostUsedBomb.json", JSON.stringify({ total: totalNotes, percents }, null, 2));
