//
//  This script generates environments
//

import fs from "fs";
import { BSMap, Info, notesObj, percentsObj } from "./types";

var envs: notesObj = {};
var percents: percentsObj = {};

let path = `D:/maps`;

var maps = fs.readdirSync(path + "/");

for (let i = 0; i < maps.length; i++) {
	const map = maps[i];

	console.log(`Parsing Map ${map}!`);
	let info = JSON.parse(fs.readFileSync(`${path}/${map}/info.dat`, { encoding: "utf-8" })) as Info;

	let amount = envs[info._environmentName] != null ? envs[info._environmentName] : 0;
	amount++;
	envs[info._environmentName] = amount;

	console.log(`Parsed Map ${map}! ${i}/${maps.length}`);
}

Object.keys(envs).forEach((key) => {
	percents[key] = ((envs[key] / maps.length) * 100).toFixed(4);
});

fs.writeFileSync("out/environments.json", JSON.stringify({ percents }, null, 2));
