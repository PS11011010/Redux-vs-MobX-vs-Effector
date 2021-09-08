import { TFibonacciN, TFibonacciNe, TFibonacciNj } from './Interface';

const FibonacciSequence = [5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584];
const getNj: (n: TFibonacciN) => TFibonacciNj = (N) => {
    return (FibonacciSequence[FibonacciSequence.indexOf(N) - 2] as TFibonacciNj)
};
const getNe: (n: TFibonacciN) => TFibonacciNe = (N) => {
    return (FibonacciSequence[FibonacciSequence.indexOf(N) - 1] as TFibonacciNe)
};
const random: (n: number) => number = (n) => Math.floor(Math.random()*(n+1));

export {
    getNj,
    getNe,
    random
}
