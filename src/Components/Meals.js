import MealItem from "./MealItem";

function Meals () {
  const meals = [
    {
      platillo: 'Jamba Juice',
      description: 'Fruit & Veggie, Orange Carrot Karma Smoothie',
      precio: 10
    },
    {
      platillo: "Florida's Natural",
      description: '100% Orange Juice with Calcium & Vitamin D',
      precio: 50
    },
    {
      platillo: 'Spaguety',
      description: 'pasta italiana adornada con finas hierbas',
      precio: 120
    }
  ]


  return <div>
    <h2>Meals</h2>
    <div className="meal">
    {meals.map((meal, i) => <MealItem
      key={i}
      {...meal}
    />)}
    </div>
  </div>
}

export default Meals;