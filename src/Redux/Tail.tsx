import React from 'react';
import DataProvider from '../Data/Provider';
import { ILevel, TSimpleProperty } from '../Data/Interface';
import Simple from '../View/Simple';

interface ITailOptions {
    tail: ILevel;
}

const Tail = (props: ITailOptions) => {
    const simpleKeys = DataProvider.getSimpleKeys(props.tail);

    return (
        <div className="View-Level__simple">
            {
                simpleKeys.map((simpleKey, i) => <Simple
                    key={i} simpleKey={simpleKey}
                    value={props.tail[simpleKey] as TSimpleProperty}
                />)
            }
        </div>
    )
}

export default Tail;
