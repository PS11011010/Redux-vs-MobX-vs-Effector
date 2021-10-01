import { configureStore, createSlice } from '@reduxjs/toolkit';
import { generateFlatTail, generateSimpleProperty, generateTail } from '../Data/Generator';
import { TFibonacciN, TFibonacciNe } from '../Data/Interface';
import { readN } from '../Home/FibonacciSelect';

const N: TFibonacciN | 1e4 = readN() || 13;
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
        const unCheckReducerName = `generatedSlice_${i}_unCheck`;
        const clearReducerName = `generatedSlice_${i}_clear`;
        const sliceName = `generatedSlice_${i}`;

        const slice = createSlice({
            name: sliceName,
            initialState: generateTail(Ne, i),
            reducers: {
                [checkReducerName](state) {
                    state.checked = true;
                },
                [generateNewDataReducerName](state) {
                    const data = generateTail(Ne, state.level);
                    for (const dataKey in data) {
                        state[dataKey] = data[dataKey];
                    }
                },
                [unCheckReducerName](state) {
                    delete  state.checked;
                },
                [clearReducerName](state) {
                    Object.keys(state).forEach((key) => delete state[key]);
                }
            }
        });

        // @ts-ignore
        actions[checkReducerName] = slice.actions[checkReducerName];
        // @ts-ignore
        actions[generateNewDataReducerName] = slice.actions[generateNewDataReducerName];
        // @ts-ignore
        actions[unCheckReducerName] = slice.actions[unCheckReducerName];
        // @ts-ignore
        actions[clearReducerName] = slice.actions[clearReducerName];

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
        const deleteItemReducerName = `generatedFlatSlice_${i}_deleteItem`;
        const clearReducerName = `generatedFlatSlice_${i}_clear`;
        const sliceName = `generatedFlatSlice_${i}`;

        const slice = createSlice({
            name: sliceName,
            initialState: generateFlatTail(Ne, i),
            reducers: {
                [addNewItemReducerName](state) {
                    state.push(generateSimpleProperty(state.length));
                },
                [generateNewDataReducerName](state) {
                    const data = generateFlatTail(Ne, state.length);
                    state.length = 0;
                    Array.prototype.push.apply(state, data);
                },
                [deleteItemReducerName](state) {
                    state.pop();
                },
                [clearReducerName](state) {
                    state.length = 0;
                }
            }
        });

        // @ts-ignore
        actions[addNewItemReducerName] = slice.actions[addNewItemReducerName];
        // @ts-ignore
        actions[generateNewDataReducerName] = slice.actions[generateNewDataReducerName];
        // @ts-ignore
        actions[deleteItemReducerName] = slice.actions[deleteItemReducerName];
        // @ts-ignore
        actions[clearReducerName] = slice.actions[clearReducerName];

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
