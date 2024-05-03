
import './App.css';
import Header from './components/Header';
import MainCarCarousel from './components/MainCarCarousel';
import SignUp from './components/SignUp';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Auth_Is_Ready } from './Redux/ReduxToolkit/authSlice';
import { projectAuth, projectFirestore } from './firebase/config';
import { useEffect } from 'react';
import SpinnerComponent from './components/smallcomponents/SpinnerComponent';
import ClientUser from './components/ClientUser';
import SingleCartDetails from './components/ClientComponents/SingleCartDetails';
import { errorData, loadingData, successData } from './Redux/ReduxToolkit/backendDataSlice';


function App(props) {
  useEffect(()=>{
    projectAuth.onAuthStateChanged((status)=>{
      props.authIsReadyDispatch(status)
    })
  },[])
  const {authIsReady,user} = props.auth

  useEffect(()=>{
    let ref = projectFirestore.collection('ASPR')

    ref.get().then(snapshot=>{
        props.loadingDataDispatch()
        if(snapshot.empty){
            props.errorDataDispatch('No Datas to Load')
        }else{
            let result = []
            snapshot.docs.map(e=>{
              result.push({...e.data(),id:e.id})
            })
            props.successDataDispatch(result)
        }
    })
},[])


console.log(props.cartItem)
  return (
    <BrowserRouter>
    {authIsReady ? (
    <div className="">
    <Header/>
    <Switch>

    <Route exact path ={'/'}>
      {!user && <MainCarCarousel/> }
      {user && <Redirect to={`/client/${user.displayName}`}/>}
    </Route>

 
    <Route path ={'/signUp'}>
    {user && <Redirect to={`/client/${user.displayName}`}/>}
    {!user &&  <SignUp/>}
    
    </Route>

    <Route exact path ={'/client/:name'}>

      {user && <ClientUser/> }
      {!user && <Redirect to={'/'}/>}
    </Route>


    <Route path={'/cardDetails/:prod_id'}>
      <SingleCartDetails/>
    </Route>


    </Switch>
   </div>
  ) : <SpinnerComponent/>}
   </BrowserRouter>
  );
}

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return{
    authIsReadyDispatch:(data)=>dispatch(Auth_Is_Ready(data)),
    loadingDataDispatch:()=>dispatch(loadingData()),
    successDataDispatch:(data)=>dispatch(successData(data)),
    errorDataDispatch:(data)=>dispatch(errorData(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
