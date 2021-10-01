import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackHeader from './../Home/BackHeader';
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
    addTestsResult(0, String(endTime - startTime));
    const [ testsResults, setTestsResults ] = useState<string[]>(_testResults);
    //endregion

    const tests: Array<{id: number, result?: number, description: string, action: Function}> = [
        {
            id: 0,
            result: endTime - startTime,
            description: `Вытаскиваем из store N slice и N flatSlice.`,
            action(){}
        }, {
            id: 1,
            description: `Читаем свойство level в каждом slice.`,
            action(){
                const startTime = new Date().getTime();
                const badSlices = [];

                slices.forEach((slice, i) => {
                    if (slice.level !== i) {
                        badSlices.push(i);
                    }
                })

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 2,
            description: `Вызываем action check для каждого slice.`,
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions['generatedSlice_' + i +'_check']())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 3,
            description: `Вызываем action generateNewData для каждого slice.`,
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions['generatedSlice_' + i + '_generateNewData']())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 4,
            description: `Вызываем action addNewItem для каждого flatSlice.`,
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions['generatedFlatSlice_' + i + '_addNewItem']())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 5,
            description: `Вызываем action generateNewData для каждого flatSlice.`,
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions['generatedFlatSlice_' + i + '_generateNewData']())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 6,
            description: 'Вызываем action unCheck для каждого slice.',
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions['generatedSlice_' + i +'_unCheck']())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 7,
            description: 'Вызываем action clear для каждого slice.',
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions['generatedSlice_' + i +'_clear']())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 8,
            description: 'Вызываем action deleteItem для каждого flatSlice.',
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions['generatedFlatSlice_' + i + '_deleteItem']())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 9,
            description: 'Вызываем action clear для каждого flatSlice.',
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();

                while (i--) {
                    // @ts-ignore
                    dispatch(actions['generatedFlatSlice_' + i + '_clear']())
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 10,
            description: 'Асинхронно вызываем action check для каждого slice.',
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions['generatedSlice_' + i + '_check']())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, String(this.result))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 11,
            description: 'Асинхронно вызываем action generateNewData для каждого slice.',
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions['generatedSlice_' + i + '_generateNewData']())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, String(this.result))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 12,
            description: 'Асинхронно вызываем action addNewItem для каждого flatSlice.',
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions['generatedFlatSlice_' + i + '_addNewItem']())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, String(this.result))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 13,
            description: 'Асинхронно вызываем action generateNewData для каждого flatSlice.',
            action(){
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions['generatedFlatSlice_' + i + '_generateNewData']())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, String(this.result))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 14,
            description: 'Асинхронно вызываем action unCheck для каждого slice.',
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions['generatedSlice_' + i + '_unCheck']())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, String(this.result))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 15,
            description: 'Асинхронно вызываем action clear для каждого slice.',
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions['generatedSlice_' + i + '_clear']())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, String(this.result))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 16,
            description: 'Асинхронно вызываем action deleteItem для каждого flatSlice.',
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions['generatedFlatSlice_' + i + '_deleteItem']())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, String(this.result))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 17,
            description: 'Асинхронно вызываем action clear для каждого flatSlice.',
            action() {
                let i = testInfo.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            // @ts-ignore
                            dispatch(actions['generatedFlatSlice_' + i + '_clear']())
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, String(this.result))

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
                <span className="M-Margin-m">{test.description}</span>
            </div>)
        });

    const copyResult = () => {
        navigator.clipboard.writeText(testsResults.join('\n')).then(() => void 0);
    }

    return (
        <>
            <BackHeader onFibonacciSelect={() => window.location.reload()}/>
            <div className="M-Flex M-FlexRow">
                <div className="M-FlexColumn">
                    <span className="Redux-Title Home-Title">Redux</span>
                    <button
                        className="M-Margin-xl"
                        onClick={() => copyResult()}
                        disabled={testsResults.length < tests.length}>
                        Copy results to clipboard
                    </button>
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
