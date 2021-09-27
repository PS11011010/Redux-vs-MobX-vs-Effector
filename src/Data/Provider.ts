import { generateData, linkKeyPrefix, simpleKeyPrefix } from './Generator';
import {
    ILevel,
    IRoot,
    TFibonacciN,
    TFibonacciNe,
    TFibonacciNj
} from './Interface';
import { getNj, getNe } from './Number';

const serviceKeys = ['level', 'count'];

export default class DataProvider {
    private readonly _root: IRoot;
    private _allLevels: Array<ILevel> = [];
    private _allTails: Array<ILevel> = [];
    private readonly _Nj: TFibonacciNj;
    private readonly _Ne: TFibonacciNe;

    constructor(private _N: TFibonacciN) {
        [this._Nj, this._Ne] = [getNj(this._N), getNe(this._N)];

        this._allLevels = generateData(this._N, this._Ne, this._Nj);
        this._root = this._allLevels.shift() as IRoot;

        this._updateAllTails();
    }

    private _updateAllTails(): void {
        this._allTails = this._allLevels.filter((level) => !level.count)
    }

    getCurrentData(): IRoot {
        return this._root;
    }

    getAllTails(): Array<ILevel> {
        return this._allTails;
    }

    static getAllKeys(level: IRoot | ILevel): string[] {
        return Object.keys(level)
            .filter((key) => !serviceKeys.includes(key));
    }

    static getSimpleKeys(level: IRoot | ILevel): string[] {
        return DataProvider.getAllKeys(level)
            .filter((key) => key.startsWith(simpleKeyPrefix))
    }

    static getLinkKeys(level: IRoot | ILevel): string[] {
        return DataProvider.getAllKeys(level)
            .filter((key) => key.startsWith(linkKeyPrefix))
    }
}
