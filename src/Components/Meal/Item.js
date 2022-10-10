import cartStyle from '../../styles/CartStyle.module.css'
import { useParams } from 'react-router-dom'
import { request } from '../../hooks/use-http';
import { useState, useEffech } from 'react';

const BASE_URL = 'https://meal-react-20cb2-default-rtdb.firebaseio.com/meals';

function Item () {
  const { mealId } = useParams()
  const [useMeal, setMeal] = useState({})

  useEffect (() => {
    const fetchMeal = async () => {
      const url = `${BASE_URL}/meals.json?orderBy="$key"&equalTo="${mealId}"`;
      const data = await request({url})
      setMeal(data)
    }

    fetchMeal();
  }, []) 

  return <div style={{marginTop: '4rem'}}>
    <div>
      <h3>{useMeal.platillo}</h3>
      <label style={{fontSize: '12pt', fontWeight: 'normal', fontStyle: 'italic'}}>
        {useMeal.description}
      </label>
      <div className={`${cartStyle.price}`} style={{margin: '0.5rem 0'}}>
        ${useMeal.precio}
      </div>
    </div>
  </div>
}

export default Item;