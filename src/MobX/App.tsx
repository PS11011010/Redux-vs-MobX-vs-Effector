import React, { useState } from 'react';
import { observer, inject } from "mobx-react"
import type { IRootStore, IGeneratedSlice, IGeneratedFlatSlice } from './Store';
import BackHeader from './../Home/BackHeader';

import './../Home/Micro.css';
import './../View/View.css';

interface IAppOptions {
    store?: IRootStore
}

let _testResults: Array<string> = [];
const addTestsResult = (i: number, value: string) => {
    _testResults[i] = _testResults[i] || value;
    _testResults = [..._testResults];
};

const App: React.FunctionComponent<IAppOptions> = (props) => {
    //region Local vars
    const slices: IGeneratedSlice[] = [];
    const flatSlices: IGeneratedFlatSlice[] = [];

    const store: IRootStore = props.store as IRootStore;
    const startTime = new Date().getTime();
    for (let j = 0; j < store.N; j++) {
        // @ts-ignore
        slices.push(store.slices.get(`generatedSlice_${j}`));
        // @ts-ignore
        flatSlices.push(store.flatSlices.get(`generatedFlatSlice_${j}`));
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
                let i = store.N;
                const startTime = new Date().getTime();
                const badSlices = [];

                while (i--) {
                    if (slices[i].level !== i) {
                        badSlices.push(i);
                    }
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 2,
            description: `Вызываем action check для каждого slice.`,
            action(){
                let i = store.N;
                const startTime = new Date().getTime();

                while (i--) {
                    slices[i].check()
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 3,
            description: `Вызываем action generateNewData для каждого slice.`,
            action(){
                let i = store.N;
                const startTime = new Date().getTime();

                while (i--) {
                    slices[i].generateNewData()
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 4,
            description: `Вызываем action addNewItem для каждого flatSlice.`,
            action() {
                let i = store.N;
                const startTime = new Date().getTime();

                while (i--) {
                    flatSlices[i].addNewItem()
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 5,
            description: `Вызываем action generateNewData для каждого flatSlice.`,
            action() {
                let i = store.N;
                const startTime = new Date().getTime();

                while (i--) {
                    flatSlices[i].generateNewData()
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 6,
            description: 'Вызываем action unCheck для каждого slice.',
            action() {
                let i = store.N;
                const startTime = new Date().getTime();

                while (i--) {
                    slices[i].unCheck()
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 7,
            description: 'Вызываем action clear для каждого slice.',
            action() {
                let i = store.N;
                const startTime = new Date().getTime();

                while (i--) {
                    slices[i].clear()
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 8,
            description: 'Вызываем action deleteItem для каждого flatSlice.',
            action() {
                let i = store.N;
                const startTime = new Date().getTime();

                while (i--) {
                    flatSlices[i].deleteItem()
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 9,
            description: 'Вызываем action clear для каждого flatSlice.',
            action() {
                let i = store.N;
                const startTime = new Date().getTime();

                while (i--) {
                    flatSlices[i].clear()
                }

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, String(this.result))

                setTestsResults(_testResults);
            }
        }, {
            id: 10,
            description: 'Асинхронно вызываем action check для каждого slice.',
            action(){
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            slices[i].check()
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
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            slices[i].generateNewData()
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
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            flatSlices[i].addNewItem()
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
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            flatSlices[i].generateNewData()
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
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            slices[i].unCheck()
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
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            slices[i].clear()
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
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            flatSlices[i].deleteItem()
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
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            flatSlices[i].clear()
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

    const buttons = tests.map((test, j) => {
        const numberOfTest = j + 1;

        return (<div key={numberOfTest} className="M-Margin-xl">
            <button onClick={() => test.action()} disabled={!!testsResults[j]}>Run Test {numberOfTest}</button>
            <span className="M-Margin-m">Test {numberOfTest} <b>Result: {testsResults[j]}</b></span>
            <span className="M-Margin-m">{test.description}</span>
        </div>)
    });

    const copyResult = () => {
        navigator.clipboard.writeText(testsResults.join('\n')).then(() => undefined);
    }

    return (
        <>
            <BackHeader onFibonacciSelect={() => window.location.reload()}/>
            <div className="M-Flex M-FlexRow">
                <div className="M-FlexColumn">
                    <span className="Mobx-Title Home-Title">MobX</span>
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

export default inject('store')(
    observer(App)
);
