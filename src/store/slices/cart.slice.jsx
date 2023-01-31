import { createSlice } from "@reduxjs/toolkit"
import { Action } from "@remix-run/router"

export const cartSlice = createSlice ({
    name: "cart",
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.action