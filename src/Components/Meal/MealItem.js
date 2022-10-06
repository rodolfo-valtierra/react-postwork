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

  return <li className={`${mealStyle['flex-wrap']} ${cartStyle['seccion-buy']}`} >
    <div className={`${mealStyle['col-half']}`}>
      <h3>{props.platillo}</h3>
      <label style={{fontSize: '12pt', fontWeight: 'normal', fontStyle: 'italic'}}>{props.description}</label>
      <div className={`${cartStyle.price}`} style={{margin: '0.5rem 0'}}>${props.precio}</div>
    </div>
    <div className={`${mealStyle['col-half']} ${mealStyle['row-reverse']} ${mealStyle['item-center']}`} > 
      <div>
        <div >
          <span>Cantidad: </span>
          <input className="col-2" defaultValue="1" onChange={changeCantidad} />
        </div>
        <div>
          <button className={`${cartStyle['button-add']}`} 
            style={{}}
            onClick={agregarACarrito} 
            value={props.id}>
            + Agregar carrito
          </button>
        </div>
      </div>
    </div>
  </li>
}

export default MealItem;
