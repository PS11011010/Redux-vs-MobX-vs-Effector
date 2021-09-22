import {
    generateLinkKey,
    generateRoot,
    generateSimpleKey,
    generateSimpleProperty,
    generateTail
} from '../src/Data/Generator';
import { ITail, TFibonacciN, TFibonacciNe, TFibonacciNj, TSimpleProperty } from '../src/Data/Interface';
import { getNe, getNj, random } from '../src/Data/Number';

describe('Data/Generator', () => {
    describe('generateSimpleKey', () => {
        it('check format', function () {
            expect(generateSimpleKey(0)).toBe('S_0');
            expect(generateSimpleKey(42)).toBe('S_42');
        });
    })

    describe('generateLinkKey', () => {
        it('check format', function () {
            expect(generateLinkKey(0)).toBe('L_0');
            expect(generateLinkKey(42)).toBe('L_42');
        });
    })

    describe('generateSimpleProperty', () => {
        it('check result type', () => {
            let i = 1000;
            let value: TSimpleProperty;
            const allowTypes = ['string', 'number', 'boolean'];

            while (i--) {
                value = generateSimpleProperty(42);

                expect(allowTypes.includes(typeof value)).toBe(true);
            }
        })
    })

    describe('generateTail', () => {
        it('check level', () => {
            const N: TFibonacciN = 34;
            const level = 7;
            const tail = generateTail(getNe(N), level);

            expect(tail.level).toBe(level);
        })

        it('check properties count', () => {
            const N: TFibonacciN = 55;
            const Ne: TFibonacciNe = getNe(N);
            const tail = generateTail(Ne, 0) as Partial<ITail>;
            delete tail.level;
            delete tail.count;

            expect(Object.keys(tail)).toBeLessThanOrEqual(Ne);
        })

        it('check only has simple properties', () => {
            const N: TFibonacciN = 55;
            const tail = generateTail(getNe(N), 0) as Partial<ITail>;
            delete tail.level;
            delete tail.count;

            expect(getSimpleKeys(tail).length).toEqual(Object.keys(tail).length);
        })

        it('check properties type', () => {
            const N: TFibonacciN = 55;
            const tail = generateTail(getNe(N), 0) as Partial<ITail>;
            const allowTypes = ['string', 'number', 'boolean'];

            for (const tailKey in tail) {
                const value = String(tail[tailKey]);

                expect(allowTypes.includes(typeof value)).toBe(true);
            }
        })
    })

    describe('generateRoot', () => {
        it('level is equal 0', () => {
            const N: TFibonacciN = 2584;
            const Ne: TFibonacciNe = getNe(N);
            const Nj: TFibonacciNj = getNj(N);

            const root = generateRoot(N, Ne, Nj)

            expect(root.level).toBe(0);
            expect(root.count).toBeGreaterThanOrEqual(1);
        })
    })
})

const getSimpleKeys: (layer: object) => Array<string> = (level) => {
    return Object.keys(level).filter((key) => key.startsWith('S_'))
}
