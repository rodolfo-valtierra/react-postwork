import MealItem from "./MealItem";
import mealStyle from '../../styles/meals.module.css'

function MealsList ({meals, add}) {

  return <div className={`${mealStyle.container}`}>
    <ul className={`${mealStyle.meal}`}>
    {
      meals.length?
      meals.map( (meal, i) => <MealItem
          key={i}
          add={add}
          meal={meal}
        />
      ): <h3>there isn't meals</h3>
    }
    </ul>
  </div>;
  }

export default MealsList;