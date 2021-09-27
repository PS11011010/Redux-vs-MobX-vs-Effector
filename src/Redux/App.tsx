import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Level from '../View/Level';
import Tail from './Tail'
import { reload, reloadTails } from './store';
import { ILevel, IRoot, TFibonacciN } from './../Data/Interface';
import BackLink from './../Home/BackLink';
import FibonacciSelect from './../Home/FibonacciSelect';

import './../Home/Micro.css';
import './../View/View.css';

const App = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const currentData: IRoot = useSelector(state => state.dataStore.currentData);
    // @ts-ignore
    const tailsCurrentData: Array<ILevel> = useSelector(state => state.tailsStore.tails);

    const onFibonacciChange = (newValue: TFibonacciN) => {
        dispatch(reload(newValue));
        dispatch(reloadTails());
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
                    <div className="View-TailGroup">
                        {
                            tailsCurrentData.map((tail) => <Tail tail={tail}/>)
                        }
                    </div>
                    <Level level={currentData}/>
                </div>
            </div>
        </>
    )
}

export default App;
