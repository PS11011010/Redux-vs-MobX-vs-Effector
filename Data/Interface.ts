interface ILinkProperty extends TLinkProperty {}

/** Шаблон простого свойства: S_XXX, где XXX - порядковый номер, выданный при генерации свойства. */
export type TSimplePropertyKey =`S_${number}`;

/** Шаблон ссылки: L_XXX, где XXX - порядковый номер, выданный при генерации свойства. */
export type TLinkKey = `L_${number}`;

/** Шаблон ключа свойства. */
type TLevelKey = TSimplePropertyKey | TLinkKey

/** Шаблон ключа свойства для хвоста */
type TTailKey = TSimplePropertyKey

/** Свойство - атомарная единица данных. */
export type TProperty = TSimpleProperty | ILinkProperty;

/** Примитивное свойство - свойство, значение по ключу которого описывается как Boolean, Number или String.*/
export type TSimpleProperty = string | number | boolean;

/** Ссылка - свойство, значение по ключу которого описывается как слой. */
export type TLinkProperty = Record<TLevelKey, TProperty>

/** Корень - объект, который является первым в цепочке сгенерированного дерева данных. */
export interface IRoot extends ILevel {
    level: number;
}

/** Слой - объект, на который ссылается корень или другой слой. */
export interface ILevel extends Partial< Record<TLevelKey, TProperty> > {
    level: number;
}

/** Упорядоченный слой - слой, значения ключей которого вложены в Array. Значение level лежит в 0 индексе. */
export interface IFlatLevel {
    0: number;
    [index: number]: TProperty;
}

/** Хвост - слой, который модержит в себе только примитивные значения в свойствах. */
export interface ITail extends Partial< Record<TTailKey, TSimpleProperty> > {
    level: number;
    tail: true;
}

/** Упорядоченный хвост - слой, значения ключей которого вложены в Array. Значение level лежит в 0 индексе.
 * Значение tail лежит в индексе 1 и содержит строку "tail".
 */
export interface IFlatTail {
    0: number;
    1: 'tail';
    [index: number]: TSimpleProperty;
}

/** N - глубина вложенности и максимальное количество свойств в каждом слое определяется параметром.
 * Соответствует одному из чисел ряда Фибоначчи от 10 до 1000.
 */
export type TFibonacciN = 13 | 21 | 34 | 55 | 89 | 144 | 233 | 377 | 610 | 987;

/** Nj - (N junior) младшее число пропорции. Для N = 34 это будет 13. */
export type TFibonacciNj = 5 | 8 | 13 | 21 | 34 | 55 | 89 | 144 | 233 | 377;

/** Ne - (N elder) старшее число пропорции. Для N = 34 это будет 21. */
export type TFibonacciNe = 8 | 13 | 21 | 34 | 55 | 89 | 144 | 233 | 377 | 610;
