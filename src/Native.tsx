import React, { useState } from 'react';
import { IRoot, TFibonacciN } from './Data/Interface';
import BackLink from './Home/BackLink';
import FibonacciSelect from './Home/FibonacciSelect';
import Level from './View/Level';
import DataProvider from './Data/Provider';
import './Home/Micro.css'

const Native = () => {
    let dataProvider = new DataProvider(13);
    const [currentData, setCurrentData] = useState<IRoot>(dataProvider.getCurrentData());

    const onFibonacciChange = (newValue: TFibonacciN) => {
        dataProvider = new DataProvider(newValue);
        setCurrentData(dataProvider.getCurrentData());
    }

    return (
        <>
            <BackLink/>
            <div className="M-Flex M-FlexRow">
                <div className="M-FlexColumn">
                    <span className="Native-Title Home-Title">Native</span>
                    <FibonacciSelect onChange={onFibonacciChange}/>
                </div>
                <div className="M-FullWidth">
                    <Level level={currentData}/>
                </div>
            </div>
        </>
    )
}

export default Native;
