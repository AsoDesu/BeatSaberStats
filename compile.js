//
//  This script compiles all of the songs from the Ranked playlist into one txt containing all the hashes for ranked maps
//  If you wanna use this script, download the Ranked Playlists and put them in a folder called "data"
//  https://github.com/aplulu/bs-ranked-playlist
//

const fs = require("fs");
const playlists = fs.readdirSync("data/");

var songs = "";

for (let playlist of playlists) {
	const data = JSON.parse(fs.readFileSync("data/" + playlist));
	for (let song of data.songs) {
		if (songs.includes(song.hash)) continue;
		songs = songs.concat(song.hash + "\n");
	}
}

fs.writeFileSync(`${__dirname}/out/ranked.txt`, songs, { encoding: "utf-8" });
