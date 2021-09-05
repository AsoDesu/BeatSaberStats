//
//  Boring TypeScript stuff
//

// diff.dat
export interface BSMap {
	_version: string;
	_BPMChanges?: null[] | null;
	_events?: EventsEntity[] | null;
	_notes?: NotesEntity[] | null;
	_obstacles?: ObstaclesEntity[] | null;
	_bookmarks?: null[] | null;
}
export interface EventsEntity {
	_time: number;
	_type: number;
	_value: number;
}
export interface NotesEntity {
	_time: number;
	_lineIndex: number;
	_lineLayer: number;
	_type: number;
	_cutDirection: number;
}
export interface ObstaclesEntity {
	_time: number;
	_lineIndex: number;
	_type: number;
	_duration: number;
	_width: number;
}

// Info.dat
export interface Info {
	_version: string;
	_songName: string;
	_songSubName: string;
	_songAuthorName: string;
	_levelAuthorName: string;
	_beatsPerMinute: number;
	_songTimeOffset: number;
	_shuffle: number;
	_shufflePeriod: number;
	_previewStartTime: number;
	_previewDuration: number;
	_songFilename: string;
	_coverImageFilename: string;
	_environmentName: string;
	_customData: CustomData;
	_difficultyBeatmapSets?: DifficultyBeatmapSetsEntity[] | null;
}
export interface CustomData {
	_contributors?: ContributorsEntity[] | null;
	_customEnvironment: string;
	_customEnvironmentHash: string;
}
export interface ContributorsEntity {
	_role: string;
	_name: string;
	_iconPath: string;
}
export interface DifficultyBeatmapSetsEntity {
	_beatmapCharacteristicName: string;
	_difficultyBeatmaps?: DifficultyBeatmapsEntity[] | null;
}
export interface DifficultyBeatmapsEntity {
	_difficulty: string;
	_difficultyRank: number;
	_beatmapFilename: string;
	_noteJumpMovementSpeed: number;
	_noteJumpStartBeatOffset: number;
	_customData: CustomData1;
}
export interface CustomData1 {
	_difficultyLabel: string;
	_editorOffset: number;
	_editorOldOffset: number;
	_warnings?: null[] | null;
	_information?: null[] | null;
	_suggestions?: null[] | null;
	_requirements?: null[] | null;
}

// Custom Types
export interface notesObj {
	[key: string]: number;
}

export interface percentsObj {
	[key: string]: string;
}
