import './SingleCartDetails.css'
import {Link,useHistory, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import { projectFirestore } from '../../firebase/config'
import { useEffect,useState } from 'react'
import SpinnerComponent from '../smallcomponents/SpinnerComponent'
import { addQuantity, decrementQuantity, removeCart } from '../../Redux/ReduxToolkit/backendDataSlice'
import { singleCart } from '../../Redux/ReduxToolkit/cartPrevSlice'


function SingleCartDetails(props){

    const [productDetails,setProductDetails] = useState(null)
    const [categoryName,setCategoryName] = useState('')
    const [selectImg,setSelectImg] = useState(0)
    const [indexCart,setIndexCart] = useState(0)
    const {user} = props.auth
    const history = useHistory()
    const params = useParams()


    let {cartDetails} = props.cartPrev

    const {categoryListOfObj } = props.backend


   

 
    useEffect(()=>{
      projectFirestore.collection('ASPR').doc(params.prod_id).get().then(snapshot=>{
          setProductDetails(snapshot.data())
          return snapshot.data()
      }).then((fin)=>{
        setCategoryName(fin.category)
      })
},[])

useEffect(()=>{
if(categoryName){
 categoryListOfObj[categoryName].map((e,index)=>{
  if(e.id == params.prod_id){
    setIndexCart(index)
  }
 })
}
},[categoryName])




    function handleSelectImg(index){
      setSelectImg(index)
    }

  
    function handleAddCart(){
      props.addQuantityDispatch(cartDetails)
    }
 
    function handleDecrCart(){
      props.decrementQuantityDispatch(cartDetails)
    }


    function handleGoBack(){
      props.singleCartDetailsEmptyDispatch({})
      history.push(`/client/${user.displayName}`)
    }

// console.log(categoryListOfObj)

    return(
        <>
        {productDetails ? 
        (<div class="body">
           
  <div class="singleCardContainer">
    <div class="card-left">
      <div class="main-image">
          <img src={productDetails.sampleImages[selectImg]}/>
      </div>
      <div class="img-select">
        {productDetails.sampleImages.map((e,index)=>(
             <div class={`img ${index == selectImg ? 'active':''}`}>
             <a onClick={()=>handleSelectImg(index)} data-id={index+1}><img src={e}/></a>
           </div>
        ))}
       
      
        
      </div>
    </div>
    <div class="card-right">
    <div class="row">
    <div class="col-9">
    <h3>{productDetails.spareName}</h3>
    </div>
    <div class="col">
      <button onClick={handleGoBack}  className='btn btn-secondary btn-sm'>Go Back</button>
    </div>
  </div>
        
        <h4>${productDetails.price}   <span> ${productDetails.price+300}</span></h4>
        <p>{productDetails.productDetails}</p>

        <div class="form">
          <div class="form-group">
            <label>Color</label>
            <select>
                <option>Black</option>
                <option>Red</option>
                <option>Green</option>
                <option>Blue</option>
            </select>
          </div>
          <div class="form-group">
            <label>Qty</label>
            <div class="input-group">
              <button class="minus" onClick={handleDecrCart}>-</button>
              <input type="text" value={0} id="qty"/>
              <button class="plus" onClick={handleAddCart}>+</button>
            </div>
          </div>
        </div>

        <button class="btn btn-success">Add Cart</button>

    </div>
  </div>

</div>) : <SpinnerComponent/>}
</>
    )
}

const mapStateToProps = (state)=>{
    return state
}

const mapDispatchToProps = (dispatch)=>{
  return{
    addQuantityDispatch:(data)=>dispatch(addQuantity(data)),
    removeCartDispatch:(data)=>dispatch(removeCart(data)),
    decrementQuantityDispatch:(data)=>dispatch(decrementQuantity(data)),
    singleCartDetailsEmptyDispatch:(data)=>dispatch(singleCart(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (SingleCartDetails)