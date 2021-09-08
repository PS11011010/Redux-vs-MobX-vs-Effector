export type TProperty = boolean | number | string | Record<string, ILevel>
export type TSimpleProperty = boolean | number | string;

/** Корень - объект, который является первым в цепочке сгенерированного дерева данных. */
export interface IRoot extends ILevel {
    total: number;
}

/** Слой - объект, на который ссылается корень или другой слой. */
export interface ILevel {
    level: number;
    count: number;
    [propName: string]: boolean | number | string | Record<string, unknown>;
}

/** Упорядоченный слой - слой, значения ключей которого вложены в Array. Значение level лежит в 0 индексе. */
export interface IFlatLevel {
    0: number;
    [index: number]: boolean | number | string | Record<string, unknown>;
}

/** Хвост - слой, который модержит в себе только примитивные значения в свойствах. */
export interface ITail extends ILevel {
    [propName: string]: boolean | number | string;
}

/** Упорядоченный хвост - слой, значения ключей которого вложены в Array. Значение level лежит в 0 индексе.
 * Значение tail лежит в индексе 1 и содержит строку "tail".
 */
export interface IFlatTail {
    0: number;
    1: 'tail';
    [index: number]: boolean | number | string;
}

/** N - глубина вложенности и максимальное количество свойств в каждом слое определяется параметром.
 * Соответствует одному из чисел ряда Фибоначчи от 10 до 1000.
 */
export type TFibonacciN = 13 | 21 | 34 | 55 | 89 | 144 | 233 | 377 | 610 | 987 | 1597 | 2584;

/** Nj - (N junior) младшее число пропорции. Для N = 34 это будет 13. */
export type TFibonacciNj = 5 | 8 | 13 | 21 | 34 | 55 | 89 | 144 | 233 | 377 | 610 | 987;

/** Ne - (N elder) старшее число пропорции. Для N = 34 это будет 21. */
export type TFibonacciNe = 8 | 13 | 21 | 34 | 55 | 89 | 144 | 233 | 377 | 610 | 987 | 1597;
