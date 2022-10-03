import { useState } from 'react'
import MealItem from "./MealItem";
import Cart from './Cart'

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

  return <div>
    <h2>Meals</h2>
    <Cart amount={cart}/>

    <div className="meal">
    {meals.map((meal, i) => <MealItem
      key={i}
      agregarCarrito={setCart}
      {...meal}
    />)}
    </div>
  </div>
}

export default Meals;