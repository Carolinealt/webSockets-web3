import { createSlice } from "@reduxjs/toolkit";

const metaSlice = createSlice({
    name: "metaMask",
    initialState: {
        balance: 0,
        address: ''
    },
    reducers: {
        updAddress: (state, { payload }) => {
            state.address = payload
        },
        updBalance: (state, { payload }) => {
            state.balance = payload
        }
    }
})

export default metaSlice.reducer;

export const { updAddress, updBalance } = metaSlice.actions;