import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackLink from './../Home/BackLink';
import { actions } from './store';

import './../Home/Micro.css';
import './../View/View.css';

let _testResults: Array<string> = [];
const addTestsResult = (i: number, value: string) => {
    _testResults[i] = _testResults[i] || value;
    _testResults = [..._testResults];
};

const App = () => {
    //region Local vars
    const dispatch = useDispatch();
    // @ts-ignore
    const testInfo = useSelector(state => state.testInfo);
    const slices: any[] = [];
    const flatSlices: any[] = [];

    const startTime = new Date().getTime();
    for (let i = 0; i < testInfo.N; i++) {
        // @ts-ignore
        // eslint-disable-next-line react-hooks/rules-of-hooks
        slices.push(useSelector(state => state[`generatedSlice_${i}`]));
        // @ts-ignore
        // eslint-disable-next-line react-hooks/rules-of-hooks
        flatSlices.push(useSelector(state => state[`generatedFlatSlice_${i}`]));
    }
    const endTime = new Date().getTime();
    addTestsResult(0, `Время, за которое было вытащено ${testInfo.N} slice: ${endTime - startTime} мсек.`);
    const [ testsResults, setTestsResults ] = useState<string[]>(_testResults);
    //endregion

    const tests: Array<{id: number, result?: number, description: string, action: Function}> = [
        {
            id: 0,
            result: endTime - startTime,
            description: `У нас ${testInfo.N} slice объектов в store. Их вытаскивание хуком useSelector занимает какое-то время`,
            action(){}
        }, {
            id: 1,
            description: `У нас ${testInfo.N} slice объектов. Пройдемся по ним циклом и заглянем в значение свойства level`,
            action(){
                const startTime = new Date().getTime();
                const badSlices = [];

                slices.forEach((slice, i) => {
                    if (slice.level !== i) {
                        badSlices.push(i);
                    }
                })

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое было просмотрено свойство level для ${testInfo.N} slice:`,
                    `${this.result} мсек.`,
                    `Не совпало id: ${badSlices.length}`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 2,
            description: `У нас ${testInfo.N} slice объектов. Вызовем у каждого action "check"`,
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions[`generatedSlice_${i}_check`]())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое был вызван action "check" для ${testInfo.N} slice:`,
                    `${this.result} мсек.`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 3,
            description: `У нас ${testInfo.N} slice объектов. Вызовем у каждого action "generateNewData"`,
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions[`generatedSlice_${i}_generateNewData`]())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое был вызван action "generateNewData" для ${testInfo.N} slice:`,
                    `${this.result} мсек.`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 4,
            description: `У нас ${testInfo.N} slice массивов. Вызовем у каждого action "addNewItem"`,
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions[`generatedFlatSlice_${i}_addNewItem`]())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое был вызван action "addNewItem" для ${testInfo.N} slice:`,
                    `${this.result} мсек.`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 5,
            description: `У нас ${testInfo.N} slice массивов. Вызовем у каждого action "generateNewData"`,
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions[`generatedFlatSlice_${i}_generateNewData`]())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое был вызван action "generateNewData" для ${testInfo.N} slice:`,
                    `${this.result} мсек.`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 6,
            description: `Async. У нас ${testInfo.N} slice объектов. Вызовем у каждого action "check" через setTimeout(0)`,
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions[`generatedSlice_${i}_check`]())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, [
                        `Async. Время, за которое был вызван action "check" через setTimeout(0) для ${testInfo.N} slice:`,
                        `${this.result} мсек.`
                    ].join(' '))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 7,
            description: `Async. У нас ${testInfo.N} slice объектов. Вызовем у каждого action "generateNewData" через setTimeout(0)`,
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions[`generatedSlice_${i}_generateNewData`]())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, [
                        `Async. Время, за которое был вызван action "generateNewData" через setTimeout(0) для ${testInfo.N} slice:`,
                        `${this.result} мсек.`
                    ].join(' '))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 8,
            description: `Async. У нас ${testInfo.N} slice массивов. Вызовем у каждого action "addNewItem" через setTimeout(0)`,
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions[`generatedFlatSlice_${i}_addNewItem`]())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, [
                        `Async. Время, за которое был вызван action "addNewItem" через setTimeout(0) для ${testInfo.N} slice:`,
                        `${this.result} мсек.`
                    ].join(' '))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 9,
            description: `Async. У нас ${testInfo.N} slice массивов. Вызовем у каждого action "generateNewData" через setTimeout(0)`,
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions[`generatedFlatSlice_${i}_generateNewData`]())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, [
                        `Async. Время, за которое был вызван action "generateNewData" через setTimeout(0) для ${testInfo.N} slice:`,
                        `${this.result} мсек.`
                    ].join(' '))

                    setTestsResults(_testResults);
                })
            }
        }
    ];

    const buttons = tests.map((test, i) => {
            const numberOfTest = i + 1;

            return (<div key={numberOfTest} className="M-Margin-xl">
                <button onClick={() => test.action()} disabled={!!testsResults[i]}>Run Test {numberOfTest}</button>
                <span className="M-Margin-m">Test {numberOfTest} <b>Result: {testsResults[i]}</b></span>
                <div className="M-Margin-m">{test.description}</div>
            </div>)
        });

    return (
        <>
            <BackLink/>
            <div className="M-Flex M-FlexRow">
                <div className="M-FlexColumn">
                    <span className="Redux-Title Home-Title">Redux</span>
                </div>
                <div className="M-FullWidth M-Flex M-FlexColumn">
                    {
                        buttons.map(button => button)
                    }
                </div>
            </div>
        </>
    )
}

export default App;
