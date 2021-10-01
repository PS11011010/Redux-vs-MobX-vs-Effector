import { Instance, types } from "mobx-state-tree";
import { generateFlatTail, generateSimpleProperty, generateTail } from '../Data/Generator';
import { TFibonacciNe } from '../Data/Interface';
import { readN } from '../Home/FibonacciSelect';

const N = readN();
const Ne: TFibonacciNe = 144;

const GeneratedSlice = types
    .model('GeneratedSlice', {
        tail: types.map(types.union(types.boolean, types.string, types.number)),
        level: types.number,
        checked: types.optional(types.union(types.boolean, types.undefined), undefined)
    })
    .actions(self => {
        return {
            check() {
                self.checked = true
            },
            generateNewData() {
                const data = generateTail(Ne, self.level);
                for (const dataKey in data) {
                    self.tail.set(dataKey, data[dataKey])
                }
            },
            unCheck() {
                self.checked = undefined;
            },
            clear() {
                self.tail.clear();
            }
        }
    });

const GeneratedFlatSlice = types
    .model('GeneratedFlatSlice', {
        flatTail: types.array(types.union(types.boolean, types.string, types.number))
    })
    .actions(self => {
        return {
            addNewItem() {
                self.flatTail.push(generateSimpleProperty(self.flatTail.length))
            },
            generateNewData() {
                self.flatTail.length = 0;
                Array.prototype.push.apply(self.flatTail, generateFlatTail(Ne, 1))
            },
            deleteItem() {
                self.flatTail.pop();
            },
            clear() {
                self.flatTail.clear();
            }
        }
    })


const RootStore = types
    .model('RootStore', {
        N: types.number,
        slices: types.map(GeneratedSlice),
        flatSlices: types.map(GeneratedFlatSlice)
    })

export const store = RootStore.create({
    N,
    slices: Array
        .apply(null, new Array(N))
        .map((_, i) => generateTail(Ne, i))
        .reduce((result, tail, i) => {
            // @ts-ignore
            result[`generatedSlice_${i}`] = GeneratedSlice.create({
                tail,
                level: tail.level
            })

            return result;
        }, {}),
    flatSlices: Array
        .apply(null, new Array(N))
        .map((_, i) => generateFlatTail(Ne, i))
        .reduce((result, flatTail, i) => {
            // @ts-ignore
            result[`generatedFlatSlice_${i}`] = GeneratedFlatSlice.create({
                flatTail
            })

            return result;
        }, {})
});

export interface IGeneratedSlice extends Instance<typeof GeneratedSlice> {}
export interface IGeneratedFlatSlice extends Instance<typeof GeneratedFlatSlice> {}
export interface IRootStore extends Instance<typeof RootStore> {}
