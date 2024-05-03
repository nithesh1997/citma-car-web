import {createSlice} from '@reduxjs/toolkit'


const backendDataSlice = createSlice({
    name:'backend',
    initialState:{
        loading:false,
        data:[],
        error:false,
        categoryList:[],
        categoryListOfObj:{},
        selectedCategory:''
    },
    reducers:{
        loadingData:(state)=>{
            state.loading = true 
            state.data = []
            state.error = false
        },
        successData:(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = false

            // categoryList 
            let category = action.payload
           let categoryData = [...new Set(category.map(e=>{
                return e.category
            }))]
            state.categoryList = categoryData
            state.selectedCategory = categoryData[0]


            // categoryListOfObj
          state.categoryListOfObj =  state.categoryList.reduce((acc,cur)=>{
                acc[cur] = state.data.filter(e=>{
                    return e.category == cur
                })
                return acc
            },{})
        },
        errorData:(state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.payload

            state.categoryList = []
        },
        selectCategory:(state,action)=>{
            state.selectedCategory = action.payload
        },
        addQuantity:(state,action)=>{
            let cardDetails = action.payload
        
            let exiting = state.categoryListOfObj[cardDetails.category].find(e=>{
                return e.id == cardDetails.id
            })

            if(exiting.quantity){
                exiting.quantity++
            }else{
                exiting.quantity = 1
            }
           
        },
        removeCart:(state,action)=>{
            let cardDetails = action.payload
        //    state.categoryListOfObj[cardDetails.category][index] = {...cardDetails,quantity:0}  
        let exsiting = state.categoryListOfObj[cardDetails.category].find(e=>{
            return e.id == cardDetails.id
        })

        exsiting.quantity = 0

        },
        decrementQuantity:(state,action)=>{
            let cardDetails = action.payload
            // if(state.categoryListOfObj[cardDetails.category][index].quantity){
            //     state.categoryListOfObj[cardDetails.category][index] = {...cardDetails,quantity:cardDetails.quantity-1} 
            // }
            let exsiting = state.categoryListOfObj[cardDetails.category].find(e=>{
                return e.id == cardDetails.id
            })

            if(exsiting.quantity){
                exsiting.quantity--
            }
        }
    }
})


export default backendDataSlice.reducer

export const {loadingData,successData,errorData,selectCategory,addQuantity,removeCart,decrementQuantity} = backendDataSlice.actions