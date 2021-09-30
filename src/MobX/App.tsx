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
    addTestsResult(0, `Время, за которое было вытащено ${store.N} slice: ${endTime - startTime} мсек.`);
    const [ testsResults, setTestsResults ] = useState<string[]>(_testResults);
    //endregion

    const tests: Array<{id: number, result?: number, description: string, action: Function}> = [
        {
            id: 0,
            result: endTime - startTime,
            description: `У нас ${store.N} slice объектов в store. Их вытаскивание хуком useSelector занимает какое-то время`,
            action(){}
        }, {
            id: 1,
            description: `У нас ${store.N} slice объектов. Пройдемся по ним циклом и заглянем в значение свойства level`,
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
                    `Время, за которое было просмотрено свойство level для ${store.N} slice:`,
                    `${this.result} мсек.`,
                    `Не совпало id: ${badSlices.length}`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 2,
            description: `У нас ${store.N} slice объектов. Вызовем у каждого action "check"`,
            action(){
                const startTime = new Date().getTime();

                slices.forEach((slice) => slice.check())

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое был вызван action "check" для ${store.N} slice:`,
                    `${this.result} мсек.`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 3,
            description: `У нас ${store.N} slice объектов. Вызовем у каждого action "generateNewData"`,
            action(){
                const startTime = new Date().getTime();

                slices.forEach((slice) => slice.generateNewData())

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое был вызван action "generateNewData" для ${store.N} slice:`,
                    `${this.result} мсек.`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 4,
            description: `У нас ${store.N} slice массивов. Вызовем у каждого action "addNewItem"`,
            action() {
                const startTime = new Date().getTime();

                flatSlices.forEach((flatSlice) => flatSlice.addNewItem())

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое был вызван action "addNewItem" для ${store.N} slice:`,
                    `${this.result} мсек.`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 5,
            description: `У нас ${store.N} slice массивов. Вызовем у каждого action "generateNewData"`,
            action() {
                const startTime = new Date().getTime();

                flatSlices.forEach((flatSlice) => flatSlice.generateNewData())

                this.result = new Date().getTime() - startTime;
                addTestsResult(this.id, [
                    `Время, за которое был вызван action "generateNewData" для ${store.N} slice:`,
                    `${this.result} мсек.`
                ].join(' '))

                setTestsResults(_testResults);
            }
        }, {
            id: 6,
            description: `Async. У нас ${store.N} slice объектов. Вызовем у каждого action "check" через setTimeout(0)`,
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
                    addTestsResult(this.id, [
                        `Async. Время, за которое был вызван action "check" через setTimeout(0) для ${store.N} slice:`,
                        `${this.result} мсек.`
                    ].join(' '))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 7,
            description: `Async. У нас ${store.N} slice объектов. Вызовем у каждого action "generateNewData" через setTimeout(0)`,
            action(){
                let i = store.N;
                const startTime = new Date().getTime();
                const promisesToWait = [];

                while (i--) {
                    promisesToWait.push(new Promise((resolve) => {
                        setTimeout((i) => {
                            slices[i].generateNewData();
                            resolve(null);
                        }, 0, i)
                    }))
                }

                Promise.all(promisesToWait).then(() => {
                    this.result = new Date().getTime() - startTime;
                    addTestsResult(this.id, [
                        `Async. Время, за которое был вызван action "generateNewData" через setTimeout(0) для ${store.N} slice:`,
                        `${this.result} мсек.`
                    ].join(' '))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 8,
            description: `Async. У нас ${store.N} slice массивов. Вызовем у каждого action "addNewItem" через setTimeout(0)`,
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
                    addTestsResult(this.id, [
                        `Async. Время, за которое был вызван action "addNewItem" через setTimeout(0) для ${store.N} slice:`,
                        `${this.result} мсек.`
                    ].join(' '))

                    setTestsResults(_testResults);
                })
            }
        }, {
            id: 9,
            description: `Async. У нас ${store.N} slice массивов. Вызовем у каждого action "generateNewData" через setTimeout(0)`,
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
                    addTestsResult(this.id, [
                        `Async. Время, за которое был вызван action "generateNewData" через setTimeout(0) для ${store.N} slice:`,
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
            <BackHeader onFibonacciSelect={() => window.location.reload()}/>
            <div className="M-Flex M-FlexRow">
                <div className="M-FlexColumn">
                    <span className="Mobx-Title Home-Title">MobX</span>
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
