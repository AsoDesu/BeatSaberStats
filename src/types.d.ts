export interface BeatMap {
    _version: string;
    _customData: CustomData;
    _events?: (EventsEntity)[];
    _notes?: (NotesEntity)[];
    _obstacles?: (ObstaclesEntity)[];
    _waypoints?: (null)[];
}
export interface CustomData {
    _time: number;
    _BPMChanges?: (null)[] | null;
    _bookmarks?: (BookmarksEntity)[] | null;
}
export interface BookmarksEntity {
    _time: number;
    _name: string;
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

export interface Info {
    _version: string;
    _songName: string;
    _songSubName: string;
    _songAuthorName: string;
    _levelAuthorName: string;
    _beatsPerMinute: number;
    _shuffle: number;
    _shufflePeriod: number;
    _previewStartTime: number;
    _previewDuration: number;
    _songFilename: string;
    _coverImageFilename: string;
    _environmentName: string;
    _songTimeOffset: number;
    _customData: CustomData;
    _difficultyBeatmapSets?: (DifficultyBeatmapSetsEntity)[] | null;
}
export interface CustomData {
    _contributors?: (null)[] | null;
    _editors: Editors;
}
export interface Editors {
    MMA2: MMA2;
    _lastEditedBy: string;
}
export interface MMA2 {
    version: string;
}
export interface DifficultyBeatmapSetsEntity {
    _beatmapCharacteristicName: string;
    _difficultyBeatmaps?: (DifficultyBeatmapsEntity)[] | null;
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
    _editorOffset: number;
    _editorOldOffset: number;
    _warnings?: (null)[] | null;
    _information?: (null)[] | null;
    _suggestions?: (null)[] | null;
    _requirements?: (null)[] | null;
    _envColorLeft: EnvColorLeftOrEnvColorRightOrEnvColorLeftBoostOrEnvColorRightBoost;
    _envColorRight: EnvColorLeftOrEnvColorRightOrEnvColorLeftBoostOrEnvColorRightBoost;
    _envColorLeftBoost: EnvColorLeftOrEnvColorRightOrEnvColorLeftBoostOrEnvColorRightBoost;
    _envColorRightBoost: EnvColorLeftOrEnvColorRightOrEnvColorLeftBoostOrEnvColorRightBoost;
}
export interface EnvColorLeftOrEnvColorRightOrEnvColorLeftBoostOrEnvColorRightBoost {
    r: number;
    g: number;
    b: number;
}

