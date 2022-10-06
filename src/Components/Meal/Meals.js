import { useState } from 'react'
import MealItem from "./MealItem";
import Cart from '../Cart/Cart'
import mealStyle from '../../styles/meals.module.css'

function Meals () {
  const [cart, setCart] = useState([])
  
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

  return <>
    <Cart amount={cart}/>

    <div className={`${mealStyle.container}`}>
      <ul className={`${mealStyle.meal}`}>
      {
        meals.map( meal => <MealItem
            key={meal.id}
            agregarCarrito={setCart}
            {...meal}
          />
        )
      }
      </ul>
    </div>
  </>
}

export default Meals;
