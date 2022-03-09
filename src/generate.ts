import {BeatMap, Info} from "./types";
import fs from 'fs'
import { getAudioDurationInSeconds } from 'get-audio-duration'

const maps = "E:\\IJoetasticMaps\\"

let notePositions: { [i: string]: number } = {}
let bombPositions: { [i: string]: number } = {}
let duckWalls = 0
let durations: { [hash: string]: number } = {}

let totalNotes = 0
let totalBombs = 0
let totalWalls = 0

function initValues() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            let noteIndex = `${i}-${j}`
            notePositions[noteIndex] = 0
            bombPositions[noteIndex] = 0
        }
    }
}

function generateNoteBombPostitions(map: BeatMap) {
    return new Promise<void>((resolve) => {
        for (const note of map._notes) {
            let noteIndex = `${note._lineIndex}-${note._lineLayer}`
            if (note._type == 3) {
                totalBombs++
                bombPositions[noteIndex]++;
            } else {
                totalNotes++
                notePositions[noteIndex]++;
            }
        }
        resolve()
    })
}

function generateDuckWalls(map: BeatMap) {
    return new Promise<void>((resolve) => {
        for (const wall of map._obstacles) {
            if (wall._type == 1 && (wall._width == 3 || wall._width == 4)) {
                duckWalls++
            }
        }
        totalWalls += map._obstacles.length
        resolve()
    })
}

function generateDuration(hash: string, filename: string) {
    return new Promise<void>((resolve) => {
        let dur = getAudioDurationInSeconds(`${maps}${hash}\\${filename}`).then((dur) => {
            durations[hash] = dur
            resolve()
        })
    })
}

async function generateAllMapData() {
    return new Promise<void>(async (resolve) => {
        let mapList = fs.readdirSync(maps)
        for (let i in mapList) {
            let hash = mapList[i]
            let info = JSON.parse(fs.readFileSync(`${maps}${hash}\\Info.dat`, {encoding: "utf-8"})) as Info
            let diffs = difficulties(info)

            for (let diff of diffs) {
                let map = JSON.parse(fs.readFileSync(`${maps}${hash}\\${diff}`, { encoding: "utf-8" }))
                console.log(`[${i}/${mapList.length}] (${diff}) Generating Note/Bomb Positions`)
                await generateNoteBombPostitions(map)
                console.log(`[${i}/${mapList.length}] (${diff}) Generating Duck Walls`)
                await generateDuckWalls(map)
            }
            console.log(`[${i}/${mapList.length}] Generating Duration`)
            await generateDuration(hash, info._songFilename)
        }
        resolve()
    })
}

function difficulties(info: Info): string[] {
    let diffs = []
    info._difficultyBeatmapSets.forEach(char => {
        char._difficultyBeatmaps.forEach((diff) => {
            diffs.push(diff._beatmapFilename)
        })
    })
    return diffs
}

async function generateFile() {
    let template = fs.readFileSync("assets\\template", { encoding: "utf-8" })
    initValues()
    await generateAllMapData()

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            let noteIndex = `${i}-${j}`
            // Notes
            let noteString = ((notePositions[noteIndex] / totalNotes)*100).toFixed(0);
            template = template.replace(noteIndex, noteString.padEnd(3))
            // Bombs
            let bombString = ((bombPositions[noteIndex] / totalBombs)*100).toFixed(0);
            template = template.replace(noteIndex, bombString.padEnd(3))
        }
    }

    template = template.replace("Total Notes: 0", "Total Notes: " + totalNotes)
    template = template.replace("Total Bombs: 0", "Total Bombs: " + totalBombs)

    template = template.replace("Total Walls: 0", "Total Walls: " + totalWalls)
    template = template.replace("Total Duck Walls: 0", "Total Duck Walls: " + duckWalls)
    template = template.replace("% Of Duck Walls: 0", "% Of Duck Walls: " + ((duckWalls / totalWalls)*100).toFixed(0))

    let sum = 0
    let durs: [string, number][] = Object.entries(durations)
    durs = durs.sort((a, b) => b[1] - a[1])
    for (const [, dur] of durs) {
        sum += dur
    }
    template = template.replace("Average Duration: 0:00", "Average Duration: " + duration(sum / durs.length))
    template = template.replace("Total Duration: 0:00", "Total Duration: " + duration(sum))
    template = template.replace("Longest Map: [hash]", "Longest Map: " + durs[0][0])

    fs.writeFileSync("out.txt", template)
}

// Timestamp Parsing (boring math stuff i don't wanna comment)
function duration(s: number) {
    let time = Math.trunc(s)
    let mins = Math.floor(time / 60);
    let seconds = time - mins * 60;

    let minString: string = mins.toString().length == 1 ? `0${mins}` : mins.toString();
    let secString: string = seconds.toString().length == 1 ? `0${seconds}` : seconds.toString();

    return `${minString}:${secString}`;
}

generateFile()