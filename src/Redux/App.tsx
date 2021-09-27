import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Level from '../View/Level';
import { IRootLevelState, reload } from './store';
import { IRoot, TFibonacciN } from './../Data/Interface';
import BackLink from './../Home/BackLink';
import FibonacciSelect from './../Home/FibonacciSelect';

import './../Home/Micro.css'

const App = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const currentData: IRoot = useSelector<IRootLevelState>(state => state.dataStore.currentData);

    const onFibonacciChange = (newValue: TFibonacciN) => {
        dispatch(reload(newValue));
    }

    return (
        <>
            <BackLink/>
            <div className="M-Flex M-FlexRow">
                <div className="M-FlexColumn">
                    <span className="Redux-Title Home-Title">Redux</span>
                    <FibonacciSelect onChange={onFibonacciChange}/>
                </div>
                <div className="M-FullWidth">
                    <Level level={currentData}/>
                </div>
            </div>
        </>
    )
}

export default App;
