import { useState, useReducer, useEffect } from 'react'
import MealItem from "./MealItem";
import Cart from '../Cart'
import mealStyle from '../../styles/meals.module.css'
import Modal from '../UI/modal'
import CartContext from '../../Context/CartContext'
import useHttp from '../../hooks/use-http';

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
    case 'CHANGE_AMOUNT': {
      const index = oldState.cart.findIndex( el => el.id==ACTION.meal.id);
      oldState.cart[index].cantidad += ACTION.add.cantidad;


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

function Meals () {
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

  return <CartContext.Provider value={{productos: cartState.cart, count: countProducts(), total: totalProducts()}}>
    <Cart open={openCartModal}/>

    <div className={`${mealStyle.container}`}>
      <ul className={`${mealStyle.meal}`}>
      {
        meals.length?
        meals.map( (meal, i) => <MealItem
            key={i}
            add={addNewMeal}
            meal={meal}
          />
        ): <h3>there isn't meals</h3>
      }
      </ul>
    </div>
    {
      cartState.cartIsOpen?
        <Modal onConfirm={openCartModal} add={cartDispatcher} />
        : null
    }
  </CartContext.Provider>
}

export default Meals;
