import { useState, useReducer } from 'react'
import MealItem from "./MealItem";
import Cart from '../Cart'
import mealStyle from '../../styles/meals.module.css'
import Modal from '../UI/modal'
import CartContext from '../../Context/CartContext'

const meals = [
  {
    id: 1,
    platillo: 'Jamba Juice',
    description: 'Fruit & Veggie, Orange Carrot Karma Smoothie',
    precio: 10
  },
  {
    id: 2,
    platillo: "Florida's Natural",
    description: '100% Orange Juice with Calcium & Vitamin D',
    precio: 50
  },
  {
    id: 3,
    platillo: 'Spaguety',
    description: 'pasta italiana adornada con finas hierbas',
    precio: 120
  }
]

function ReducerCart (oldState,  ACTION) {
  switch (ACTION.type) {
    case 'ADD':{
      const index = oldState.cart.findIndex( el => el.id==ACTION.meal.id);
      console.log(ACTION)

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
    default: return oldState;
  }
}

function Meals () {
  const [isModalOpen, setModalOpen] = useState(false)
  const [cartState, cartDispatcher] = useReducer(ReducerCart, {cartIsOpen: false, cart: []});

  const openModal = () => setModalOpen(!isModalOpen)

  const totalProducts = () => cartState.cart.reduce((acc, el) => acc+el.precio, 0);
  const countProducts = () => cartState.cart.reduce((acc, el) => acc+el.cantidad, 0);

  const addNewMeal = (newMeal) => {
    console.log(newMeal)
    cartDispatcher({type: 'ADD', meal: newMeal})
  }

  return <CartContext.Provider value={{productos: cartState.cart, count: countProducts(), total: totalProducts()}}>
    <Cart open={openModal}/>

    <div className={`${mealStyle.container}`}>
      <ul className={`${mealStyle.meal}`}>
      {
        meals.map( meal => <MealItem
            key={meal.id}
            add={addNewMeal}
            meal={meal}
          />
        )
      }
      </ul>
    </div>
    {
      isModalOpen?
        <Modal onConfirm={openModal} add={()=>{}}/>
        : null
    }
  </CartContext.Provider>
}

export default Meals;
