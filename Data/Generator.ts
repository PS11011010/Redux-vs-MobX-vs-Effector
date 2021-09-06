import {
    ILevel,
    IRoot,
    ITail,
    TFibonacciN,
    TFibonacciNe,
    TFibonacciNj,
    TLinkKey, TProperty,
    TSimpleProperty,
    TSimplePropertyKey
} from './Interface';
import { random } from './Number';

const simpleGenerators = ['string', 'number', 'boolean'];

const generateSimpleKey: (n: number) => TSimplePropertyKey = (n) => (`S_${n}` as TSimplePropertyKey);
const generateLinkKey: (n: number) => TLinkKey = (n) => (`L_${n}` as TLinkKey);
const generateSimpleProperty: (n: number) => TSimpleProperty = (n) => {
    switch (simpleGenerators[random(simpleGenerators.length - 1)]) {
        case 'string': return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
        case 'number': return random(n)
        case 'boolean': return !!random(1)
    }

    return 0;
}

const generateTail: (Ne: TFibonacciNe, level: number) => ITail = (Ne, level) => {
    let i = 0;
    const result: ITail = {level,
        tail: true
    }

    while (i < Ne) {
        result[generateSimpleKey(i)] = generateSimpleProperty(Ne);
        i++;

        if (!random(Ne)) {
            break;
        }
    }

    return result;
}

const generateLink: (N: TFibonacciN, Ne: TFibonacciNe, Nj: TFibonacciNj, level: number) => ILevel = (N, Ne, Nj, level) => {
    let i = 0;
    const result: ILevel = {
        ...generateTail(Ne, level)
    }

    if (level && (level === N || !random(Ne))) {
        return result;
    }

    while (i < Nj) {
        result[generateLinkKey(i)] = (generateLink(N, Ne, Nj, ++level) as TProperty)
        i++;

        if (!random(Nj)) {
            break;
        }
    }

    return result;
}

const generateRoot: (N: TFibonacciN, Ne: TFibonacciNe, Nj: TFibonacciNj) => IRoot = (N, Ne, Nj) => {
    const root: IRoot = {
        ...generateTail(Ne, 0),
        ...generateLink(N, Ne, Nj, 0)
    }

    return root;
}

export {
    generateSimpleKey,
    generateLinkKey,
    generateSimpleProperty,
    generateTail,
    generateLink,
    generateRoot
}
