import {
    AnyAction,
    CaseReducerWithPrepare,
    configureStore,
    createSlice,
    Middleware, PayloadAction,
    SliceCaseReducers
} from '@reduxjs/toolkit';
import { TFibonacciN } from '../Data/Interface';
import DataProvider from '../Data/Provider';

let dataProvider = new DataProvider(13);

const rootLevelSlice = createSlice({
    name: 'dataStore',
    initialState: {
        currentData: dataProvider.getCurrentData()
    },
    reducers: {
        reload: {
            // @ts-ignore
            reducer(state: IRootLevelState) {
                state.currentData = dataProvider.getCurrentData();
            },
            // @ts-ignore
            prepare(N: TFibonacciN) {
                dataProvider = new DataProvider(N);
                return {};
            }
        }
    }
})

const allTailsSlice = createSlice({
    name: 'tailsStore',
    initialState: {
        tails: dataProvider.getAllTails()
    },
    reducers: {
        reloadTails(state) {
            state.tails = dataProvider.getAllTails();
        }
    }
})

export const { reload } = rootLevelSlice.actions;
export const { reloadTails } = allTailsSlice.actions;

export default configureStore({
    reducer: {
        dataStore: rootLevelSlice.reducer,
        tailsStore: allTailsSlice.reducer
    }
});
