import { useState } from 'react'
import MealItem from "./MealItem";
import Cart from '../Cart'
import mealStyle from '../../styles/meals.module.css'
import Modal from '../UI/modal'

function Meals () {
  const [cart, setCart] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  
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

  const addCart = (meal) => {
    const index = cart.findIndex( el => el.id==meal.id);
    console.log(index)
    if(index!=-1) 
      return setCart(cart => {
        cart[index].cantidad += meal.cantidad;
        return [...cart]; 
      });
    
    setCart(el => [...el, meal])
  } 

  return <>
    <Cart amount={cart} open={openModal}/>

    <div className={`${mealStyle.container}`}>
      <ul className={`${mealStyle.meal}`}>
      {
        meals.map( meal => <MealItem
            key={meal.id}
            add={addCart}
            meal={meal}
          />
        )
      }
      </ul>
    </div>
    {
      isModalOpen?
        <Modal onConfirm={openModal} cart={cart}/>
        : null
    }
  </>
}

export default Meals;
