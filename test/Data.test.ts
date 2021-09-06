import { generateRoot } from '../Data/Generator';
import { TFibonacciN, TFibonacciNe, TFibonacciNj } from '../Data/Interface';
import { getNe, getNj } from '../Data/Number';

describe('Data/Generator', () => {
    it('test', () => {
        const N: TFibonacciN = 13;
        const Ne: TFibonacciNe = getNe(N);
        const Nj: TFibonacciNj = getNj(N);

        const root = generateRoot(N, Ne, Nj);

        expect(true).toBe(false);
    });
})
