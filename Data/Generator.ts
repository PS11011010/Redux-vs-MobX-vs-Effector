import {
    ILevel,
    IRoot,
    ITail,
    TFibonacciN,
    TFibonacciNe,
    TFibonacciNj,
    TSimpleProperty,
} from './Interface';
import { random } from './Number';

const simpleGenerators = ['string', 'number', 'boolean'];

const generateSimpleKey: (n: number) => string = (n) => `S_${n}`;
const generateLinkKey: (n: number) => string = (n) => `L_${n}`;
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
        count: 0
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

const generateLevel: (parent: ILevel, Ne: TFibonacciNe, Nj: TFibonacciNj) => ILevel = (parent, Ne, Nj) => {
    if (parent.count === Nj) {
        return generateLevel(parent[generateLinkKey(random(parent.count - 1))] as ILevel, Ne, Nj);
    }

    const newLevel = generateTail(Ne, parent.level + 1);
    parent[generateLinkKey(++parent.count)] = newLevel;

    return newLevel;
}

const generateRoot: (N: TFibonacciN, Ne: TFibonacciNe, Nj: TFibonacciNj) => IRoot = (N, Ne, Nj) => {
    const root = {
        ...generateTail(Ne, 0),
        total: N
    }
    const allLevels: Array<ILevel> = [root];

    /** Создадим цепочку глубиной Nj */
    while (allLevels.length !== Nj) {
        allLevels.push(generateLevel(allLevels[allLevels.length - 1], Ne, Nj));
    }

    /** Навешаем в случайные ветви цепочки потомков */
    while (allLevels.length !== N) {
        allLevels.push(generateLevel(allLevels[random(allLevels.length - 1)], Ne, Nj));
    }

    return root;
}

export {
    generateSimpleKey,
    generateLinkKey,
    generateSimpleProperty,
    generateTail,
    generateLevel,
    generateRoot
}
