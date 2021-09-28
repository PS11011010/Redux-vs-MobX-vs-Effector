import React from 'react';
import { Link } from 'react-router-dom';
import './BackHeader.css'
import { TFibonacciN } from '../Data/Interface';
import FibonacciSelect, { writeN } from './FibonacciSelect';

interface IBackHeaderOptions {
    onFibonacciSelect?: Function;
}

const BackHeader = (props: IBackHeaderOptions) => {
    const onFibonacciChange = (newValue: TFibonacciN) => {
        writeN(newValue);
        props?.onFibonacciSelect?.(newValue);
    }
    
    return (
        <div className="Home-BackHeader M-Flex">
            <Link className="Home-BackHeader__link M-Margin-xl" to="/">&lt;&nbsp;Back</Link>
            <FibonacciSelect className="Home-BackHeader__select" onChange={onFibonacciChange}/>
            {' '}
        </div>
    )
}

export default BackHeader;
