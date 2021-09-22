import React from 'react';
import Select from 'react-select';
import { OptionTypeBase } from 'react-select/src/types';
import { FibonacciSequence } from '../Data/Number';
import '../Home/Micro.css'

interface IFibonacciSelectOptions {
    onChange: Function;
}

/** { value: 'chocolate', label: 'Chocolate' } */
const variants: OptionTypeBase[] = FibonacciSequence
    .filter((n) => n >= 13) /** По-условиям, мы генерируем числа из ряда Фибоначчи, начиная только с 13 */
    .map((n) => {
        const result: OptionTypeBase = {
            value: n,
            label: n
        }

        return result;
    });

const FibonacciSelect = (props: IFibonacciSelectOptions) => {
    return <Select
        className="M-Margin-xl"
        options={variants}
        defaultValue={variants[0]}
        onChange={(a) => props.onChange(a.value)}
    />
}

export default FibonacciSelect;
