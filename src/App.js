import { useState, useReducer, useEffect } from 'react'
import Nav from './Components/frame/nav'
import Modal from './Components/UI/modal'
import CartContext from './Context/CartContext'
import useHttp from './hooks/use-http';
import Meals from './Components/Meal/Meals'
import './styles/GeneralStyle.css'
import { Route, Routes } from 'react-router';
import Home from './pages/home'
import ItemMeal from './Components/Meal/MealItem'

function ReducerCart (oldState,  ACTION) {
  switch (ACTION.type) {
    case 'ADD':{
      const index = oldState.cart.findIndex( el => el.id==ACTION.meal.id);

      if(index!=-1) {
        oldState.cart[index].cantidad += ACTION.meal.cantidad
        return {...oldState}; 
      }
      
      oldState.cart.push(ACTION.meal);

      return {...oldState};
    };
    case 'CHANGE': {
      const index = oldState.cart.findIndex( el => el.id==ACTION.meal.id);
      oldState.cart[index].cantidad = ACTION.meal.cantidad;

      return {...oldState}
    };
    case 'DROP': {
      oldState = oldState.cart.filter(el => el.id=ACTION.dropId);
      return {...oldState};
    };
    case 'CARTMODAL':{
      return {...oldState, cartIsOpen: !oldState.cartIsOpen}     
    }
    default: return oldState;
  }
}

const BASE_URL = 'https://meal-react-20cb2-default-rtdb.firebaseio.com/';

function App () {
  const [cartState, cartDispatcher] = useReducer(ReducerCart, {cartIsOpen: false, cart: []});
  const [meals, setMeals] = useState([]);
  const { isLoading, error, request } = useHttp();

  useEffect(() => {
    const fetchMeals = async () => {
      const url = `${BASE_URL}/meals.json?orderBy="$key"&isNot="0"`;
      const data = await request({url});
  
      setMeals(data.filter((el, i) => i!=0))    
    }

    fetchMeals();
  }, [])

  const totalProducts = () => cartState.cart.reduce((acc, el) => acc+el.precio, 0);

  const countProducts = () => cartState.cart.reduce((acc, el) => acc+el.cantidad, 0);

  const addNewMeal = (newMeal) => cartDispatcher({type: 'ADD', meal: newMeal})

  const openCartModal = () => cartDispatcher({type: 'CARTMODAL'})

  return <CartContext.Provider 
    value={{
      productos: cartState.cart,
      count: countProducts(), 
      total: totalProducts(), 
      }}>
    <Nav open={openCartModal}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/menu" element={<Meals meals={meals} add={addNewMeal}/>} />
      <Route path="/menu/:mealId" element={<ItemMeal/>} />
      <Route path="/checkout" element={<Meals meals={meals} add={addNewMeal}/>} />
    </Routes>
    {
      cartState.cartIsOpen?
        <Modal onConfirm={openCartModal} add={cartDispatcher} />
        : null
    }
  </CartContext.Provider>
}

export default App;
