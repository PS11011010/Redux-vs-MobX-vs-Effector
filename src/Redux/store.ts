import {
    AnyAction,
    CaseReducerWithPrepare,
    configureStore,
    createSlice,
    Middleware, PayloadAction,
    SliceCaseReducers
} from '@reduxjs/toolkit';
import { IRoot, TFibonacciN } from '../Data/Interface';
import DataProvider from '../Data/Provider';

export interface IRootLevelState {
    currentData: IRoot
}

export interface IRootLevelCaseReducer extends SliceCaseReducers<IRootLevelState> {
    reload: CaseReducerWithPrepare<IRootLevelState, PayloadAction<any, string, any, any>>
}

let dataProvider = new DataProvider(13);

const rootLevelSlice = createSlice<IRootLevelState, IRootLevelCaseReducer, 'dataStore'>({
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

export const { reload } = rootLevelSlice.actions;

export default configureStore({
    reducer: {
        dataStore: rootLevelSlice.reducer
    }
});
