import { generateRoot } from './Generator';
import {
    IRoot,
    TFibonacciN,
    TFibonacciNe,
    TFibonacciNj
} from './Interface';
import { getNj, getNe } from './Number';

export default class DataProvider {
    private _root: IRoot;
    private _Nj: TFibonacciNj;
    private _Ne: TFibonacciNe;

    constructor(private _N: TFibonacciN) {
        [this._Nj, this._Ne] = [getNj(this._N), getNe(this._N)];

        this._root = generateRoot(this._N, this._Ne, this._Nj);
    }
}
