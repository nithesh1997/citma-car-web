import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link,useHistory} from 'react-router-dom'
import { Badge} from 'antd';
import {connect} from 'react-redux'
import { addQuantity, decrementQuantity,removeCart } from '../../Redux/ReduxToolkit/backendDataSlice';
import { singleCart } from '../../Redux/ReduxToolkit/cartPrevSlice';
import { addCartItem, removeItemCart,decrementCart } from '../../Redux/ReduxToolkit/cartItemsSlice';



function CartItem({cardDetails,index,addQuantityDispatch,removeCartDispatch,decrementQuantityDispatch,singleCartDetailDispatch,addCartItemDispatch,decrementCartItemDispatch,removeItemCartDispatch}){

  let history = useHistory()

  function handleAddToCart(){
    addQuantityDispatch(cardDetails)
    addCartItemDispatch(cardDetails)
  }


  function handleRemoveCart(){
    removeCartDispatch(cardDetails)
    removeItemCartDispatch(cardDetails)
  }


  function handleDecreCart(){
    decrementQuantityDispatch(cardDetails)
    decrementCartItemDispatch(cardDetails)
  }


  function handlePrew(){
    singleCartDetailDispatch(cardDetails)
    history.push(`/cardDetails/${cardDetails.id}`)
  }
    return(
        <div className='mt-3'>
        <Card style={{ width: '15rem', height:'21rem'}}>
          <Badge.Ribbon text="!Offer 30%" color="green">

      <Card.Img variant="top" style={{width:'100%' , height:'8rem'}} src={cardDetails.thumbNail} />
      <Card.Body>
        <Card.Title>
            <marquee width="100%" direction="left" scrollamount="3">
           {cardDetails.spareName}
            </marquee>
</Card.Title>
        <Card.Text>
            {/* <p>{'Board & De-Board from your car in style with Genuine Illuminated Door Sill Guards'.slice(0,52)+'...'}</p> */}
            <h3 className='text-center'>₹ {cardDetails.price} </h3>
        
        </Card.Text>


        <div class="row">
    <div class="col">
    <b>Stock : {cardDetails.stock}</b>  
    </div>
    <div class="col text-center">
        <button onClick={handlePrew} className='btn btn-light'>Prew</button>
    </div>
  </div>

  {!cardDetails.quantity ? 
       ( <div className='text-center mt-3'>
        <Button variant="primary" onClick={()=>handleAddToCart()}>Add To Cart</Button>
        </div>)
          :

        (<div class="row mt-3">
    <div class="col">
      <button className='removeCartBtn' onClick={()=>handleRemoveCart()}>Remove</button>
    </div>
    <div class="col">
      <div style={{display:'flex'}}>
        <button className='btn btn-outline-dark' onClick={handleAddToCart}>+</button>
        <button className='btn'>{cardDetails.quantity}</button>
        <button className='btn btn-outline-dark' onClick={handleDecreCart}>-</button>
      </div>
    </div>
  </div>)}
      </Card.Body>

    </Badge.Ribbon>
    </Card>
    </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
  return{
    addQuantityDispatch:(data)=>dispatch(addQuantity(data)),
    removeCartDispatch:(data)=>dispatch(removeCart(data)),
    decrementQuantityDispatch:(data)=>dispatch(decrementQuantity(data)),
    singleCartDetailDispatch:(data)=>dispatch(singleCart(data)),
    addCartItemDispatch:(data)=>dispatch(addCartItem(data)),
    decrementCartItemDispatch:(data)=>dispatch(decrementCart(data)),
    removeItemCartDispatch:(data)=>dispatch(removeItemCart(data))
  }
}

export default connect(null,mapDispatchToProps) (CartItem)