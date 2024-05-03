import {createSlice} from '@reduxjs/toolkit'


const cartItemsSlice = createSlice({
    name:'cartItems',
    initialState:{
        cart:[]
    },
    reducers:{
        addCartItem:(state,action)=>{
            let cardDetails = action.payload

         
            let exiting = state.cart.find(e=>{
                return e.id == cardDetails.id
            })
            if(exiting){
                exiting.quantity++
            }else{
                state.cart.push({...cardDetails,quantity:1})
            }
        },

        decrementCart:(state,action)=>{
            let cardDetails = action.payload
            let exiting = state.cart.find(e=>{
                return e.id == cardDetails.id
            })
            if(exiting.quantity >1){
                exiting.quantity--
            }else{
                state.cart = state.cart.filter(e=>e.id !== cardDetails.id)
            }
        },

        removeItemCart:(state,action)=>{
            let cardDetails = action.payload
            state.cart = state.cart.filter(e=>e.id !== cardDetails.id)
        }
    }
})


export default cartItemsSlice.reducer

export const {addCartItem,decrementCart,removeItemCart} = cartItemsSlice.actions