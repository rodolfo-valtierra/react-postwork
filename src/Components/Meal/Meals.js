import { useState, useContext, useEffect } from 'react'
import MealItem from "./MealItem";
import Cart from '../Cart'
import mealStyle from '../../styles/meals.module.css'
import Modal from '../UI/modal'
import CartContext from '../../Context/CartContext'

const ReducerCart = (oldState,  ACTION) => {
  switch (ACTION.type) {
    case 'ADD':{
      const index = oldState.findIndex( el => el.id==ACTION.meal.id);

      if(index!=-1) {
        oldState[index].cantidad += meal.cantidad
        return [...oldState]; 
      }
      
      oldState.push(ACTION.meal);

      return oldState;
    }
    case 'DROP': {
      oldState = oldState.filter(el => el.id=ACTION.dropId);
      return [...oldState];
    }
    default: return [...oldState];
  }
}

function Meals () {
  const [cart, setCart] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [cartState, cartDispatcher] = useReducer(ReducerCart);

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

  const openModal = () => setModalOpen(!isModalOpen)

  const totalProducts = () => cartState.reduce((acc, el) => acc+el.precio, 0);
  const countProducts = () => cartState.reduce((acc, el) => acc+el.cantidad, 0);

  return <CartContext.Provider value={{productos: cartState, count: countProducts, total: totalProducts}}>
    <Cart amount={cart} open={openModal}/>

    <div className={`${mealStyle.container}`}>
      <ul className={`${mealStyle.meal}`}>
      {
        meals.map( meal => <MealItem
            key={meal.id}
            add={(newMeal) => cartDispatcher({action: 'ADD',  meal: newMeal})}
            meal={meal}
          />
        )
      }
      </ul>
    </div>
    {
      isModalOpen?
        <Modal onConfirm={openModal} add={cartDispatcher}/>
        : null
    }
  </CartContext.Provider>
}

export default Meals;
