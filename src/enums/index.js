import { level1Enums } from "./level1-singleton/enums";
import { level2Enums } from "./level2-objectPool/enums";

export const LevelEnums = {
    None: 0,
    Singleton: 1,
    ObjectPool: 2,
}

export const LevelData = {
    1: level1Enums,
    2: level2Enums,
}

