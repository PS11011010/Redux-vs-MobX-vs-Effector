import React from 'react';
import { TSimpleProperty } from '../Data/Interface';
import './View.css'
import '../Home/Micro.css'

interface ISimpleOptions {
    simpleKey: string;
    value: TSimpleProperty;
}

const Simple = (props: ISimpleOptions) => {
    return <span className="View-Simple M-Margin-s">{String(props.value)}</span>
}

export default Simple;
