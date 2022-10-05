import { useState } from 'react'
import mealStyle from '../../styles/meals.module.css'
import cartStyle from '../../styles/CartStyle.module.css'

function MealItem (props) {
  const [useCantidad, setCantidad] = useState(0)

  const agregarACarrito = () => {
    props.agregarCarrito(count =>  [
      ...count, 
      {
        id: props.id, 
        cantidad: useCantidad
      }
    ]);
  }

  const changeCantidad = ({target}) => {
    setCantidad(target.value);
  }

  return <li className={`${mealStyle.card} ${cartStyle['seccion-buy']}`}>
    <div className={`${mealStyle['float-end']} `} style={{width: '15%'}}> 
      <div className={`${cartStyle['amount-seccion']}`}>
        <span>Cantidad: </span>
        <input  defaultValue="1" onChange={changeCantidad} />
      </div>
      <button className={`${cartStyle['button-add']}`} 
        style={{}}
        onClick={agregarACarrito} 
        value={props.id}>
          + Agregar carrito
      </button>
    </div>
    <div className="description-meal">
      <h3>{props.platillo}</h3>
      <label style={{fontSize: '12pt', fontWeight: 'normal', fontStyle: 'italic'}}>{props.description}</label>
      <div className={`${cartStyle.price}`}>${props.precio}</div>
    </div>
    <hr/>
  </li>
}

export default MealItem;