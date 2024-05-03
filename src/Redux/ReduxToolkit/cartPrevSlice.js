import {createSlice} from '@reduxjs/toolkit'


const cartPrevSlice = createSlice({
    name:'cartPrev',
    initialState:{
        cartDetails:undefined
    },
    reducers:{
        singleCart:(state,action)=>{
            state.cartDetails = action.payload
        }
    }
})


export default cartPrevSlice.reducer

export const {singleCart} = cartPrevSlice.actions