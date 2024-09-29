import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "valuesHistory",
    initialState: { items: [], maxValue: 65685.99000000 },
    reducers: {
        updVal: (state, { payload }) => {
            const newData = payload;
            state.items.push(newData);

            if (state.maxValue < newData.price) {
                state.maxValue = newData.price;
            }

        }
    }
})

export default slice.reducer;

export const { updVal } = slice.actions