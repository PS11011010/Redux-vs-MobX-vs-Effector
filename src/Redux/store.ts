import { configureStore, createSlice } from '@reduxjs/toolkit';
import { generateFlatTail, generateSimpleProperty, generateTail } from '../Data/Generator';
import { TFibonacciN, TFibonacciNe } from '../Data/Interface';

const N: TFibonacciN | 1e4 = 610;
const testInfoSlice = createSlice({
    name: 'testInfoStore',
    initialState: {
        N
    },
    reducers: {}
})

const actions = {};
const reducers = {
    testInfo: testInfoSlice.reducer
};

/** Генераций слайсов, состояние которого  представляют собой ITail */
(() => {
    let i = N;
    const Ne: TFibonacciNe = 144;

    while (i--) {
        const checkReducerName = `generatedSlice_${i}_check`;
        const generateNewDataReducerName = `generatedSlice_${i}_generateNewData`;
        const sliceName = `generatedSlice_${i}`;

        const slice = createSlice({
            name: sliceName,
            initialState: generateTail(Ne, i),
            reducers: {
                [checkReducerName](state) {
                    state.checked = true;
                },
                [generateNewDataReducerName](state) {
                    const data = generateTail(144, state.level);
                    for (const dataKey in data) {
                        state[dataKey] = data[dataKey];
                    }
                }
            }
        });

        // @ts-ignore
        actions[checkReducerName] = slice.actions[checkReducerName];
        // @ts-ignore
        actions[generateNewDataReducerName] = slice.actions[generateNewDataReducerName];

        // @ts-ignore
        reducers[sliceName] = slice.reducer;
    }
})();

/** Генераций слайсов, состояние которого  представляют собой Array<TSimpleProperty> */
(() => {
    let i = N;
    const Ne: TFibonacciNe = 144;

    while (i--) {
        const addNewItemReducerName = `generatedFlatSlice_${i}_addNewItem`;
        const generateNewDataReducerName = `generatedFlatSlice_${i}_generateNewData`;
        const sliceName = `generatedFlatSlice_${i}`;

        const slice = createSlice({
            name: sliceName,
            initialState: generateFlatTail(Ne, i),
            reducers: {
                [addNewItemReducerName](state) {
                    state.push(generateSimpleProperty(state.length));
                },
                [generateNewDataReducerName](state) {
                    const data = generateFlatTail(144, state.length);
                    state.length = 0;
                    Array.prototype.push.apply(state, data);
                }
            }
        });

        // @ts-ignore
        actions[addNewItemReducerName] = slice.actions[addNewItemReducerName];
        // @ts-ignore
        actions[generateNewDataReducerName] = slice.actions[generateNewDataReducerName];

        // @ts-ignore
        reducers[sliceName] = slice.reducer;
    }
})();

export default configureStore({
    reducer: reducers,
    middleware: []
});
export {
    actions
}
