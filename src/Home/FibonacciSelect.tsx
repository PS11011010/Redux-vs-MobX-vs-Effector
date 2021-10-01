import React from 'react';
import Select from 'react-select';
import { OptionTypeBase } from 'react-select/src/types';
import { TFibonacciN } from '../Data/Interface';
import { FibonacciSequence } from '../Data/Number';
import '../Home/Micro.css'

interface IFibonacciSelectOptions {
    className?: string;
    onChange: Function;
}

const writeN = (N: TFibonacciN | 1e4) => {
    localStorage.setItem('FibonacciN', String(N || 13));
}

const readN: () => TFibonacciN | 1e4 = () => {
    const data = localStorage.getItem('FibonacciN');
    if (!data || isNaN(parseInt(data))) {
        return 13;
    }

    return parseInt(data) as TFibonacciN;
}

/** { value: 'chocolate', label: 'Chocolate' } */
const variants: OptionTypeBase[] = FibonacciSequence
    .filter((n) => n >= 13) /** По-условиям, мы генерируем числа из ряда Фибоначчи, начиная только с 13 */
    .map((n) => {
        if (n === 10946) { /** При N больше 10 000 вкладка умирает примерно на 10 2хх */
            return {
                value: 1e4,
                label: 1e4
            }
        }

        const result: OptionTypeBase = {
            value: n,
            label: n
        }

        return result;
    });

const FibonacciSelect = (props: IFibonacciSelectOptions) => {
    const n = readN();
    const defaultValue = variants.filter((variant) => variant.value === n).shift();

    return <Select
        className={`M-Margin-xl ${props.className}`}
        options={variants}
        defaultValue={defaultValue}
        onChange={(a) => props.onChange(a.value)}
    />
}

export default FibonacciSelect;
export {
    writeN,
    readN
}
