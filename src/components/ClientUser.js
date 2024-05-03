import { Card } from 'antd';
import CarouselCards from 'react-elastic-carousel';
import { brandLogo,breakPointsCarLogo } from './smallcomponents/cardCarDatas';
import CartItem from './ClientComponents/CartItem';
import HeaderClient from './ClientComponents/HeaderClient';
import {connect} from 'react-redux'

const { Meta } = Card;
function ClientUser(props){

  

    const {loading,data,error,categoryList,categoryListOfObj,selectedCategory} = props.backend

    return(
        <div className='clientPage'>
            <span className='brandCards'>

              <HeaderClient categoryList={categoryList}/>

            <div className='mt-3 container card-grid'>
            {categoryListOfObj[selectedCategory] && categoryListOfObj[selectedCategory].map((e,index)=>(
                 <CartItem cardDetails={e} index={index}/>
            ))}
            </div>

             
             {/* <div className='mt-5'>
             <CarouselCards breakPoints = {breakPointsCarLogo}> 
            {brandLogo.map(e=>(
                     <img alt="example" src={e.img} width={'1.3rem'}/>
                    ))}
          
                </CarouselCards>
             </div> */}
               
            
  </span>
        </div>
    )
}


const mapStateToProps = (state)=>{
    return state
}


export default connect(mapStateToProps) (ClientUser)