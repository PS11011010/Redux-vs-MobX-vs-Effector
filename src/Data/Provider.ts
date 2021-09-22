import { generateRoot, linkKeyPrefix, simpleKeyPrefix } from './Generator';
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
    private _root: IRoot;
    private readonly _Nj: TFibonacciNj;
    private readonly _Ne: TFibonacciNe;

    constructor(private _N: TFibonacciN) {
        [this._Nj, this._Ne] = [getNj(this._N), getNe(this._N)];

        this._root = generateRoot(this._N, this._Ne, this._Nj);
    }

    getCurrentData(): IRoot {
        return this._root;
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
