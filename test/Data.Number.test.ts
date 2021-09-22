import { TFibonacciN, TFibonacciNe, TFibonacciNj } from '../src/Data/Interface';
import { getNe, getNj } from '../src/Data/Number';

describe('Data/Number', () => {
    it('Fibonacci', () => {
        const N: TFibonacciN = 13;
        const Ne: TFibonacciNe = getNe(N);
        const Nj: TFibonacciNj = getNj(N);

        expect(N).toEqual(Ne + Nj);
    })
})
