import { useState } from 'react'
import mealStyle from '../../styles/meals.module.css'
import cartStyle from '../../styles/CartStyle.module.css'

function MealItem (props) {
  const [useCantidad, setCantidad] = useState(1)
  const {
    description,
    precio,
    platillo
  } = props.meal;

  const agregarACarrito = () => {
    props.add(
      {
        ...props.meal,
        cantidad: parseInt(useCantidad)
      }
    );
  }

  const changeCantidad = ({target}) => setCantidad(target.value);

  return <li className={`${mealStyle['flex-wrap']} ${cartStyle['seccion-buy']}`} >
    <div className={`${mealStyle['col-half']}`}>
      <h3>{platillo}</h3>
      <label style={{fontSize: '12pt', fontWeight: 'normal', fontStyle: 'italic'}}>
        {description}
      </label>
      <div className={`${cartStyle.price}`} style={{margin: '0.5rem 0'}}>
        ${precio}
      </div>
    </div>
    <div className={`${mealStyle['col-half']} ${mealStyle['row-reverse']} ${mealStyle['item-center']}`} > 
      <div>
        <div >
          <span>Cantidad: </span>
          <input className="col-2" defaultValue="1" onChange={changeCantidad} />
        </div>
        <div>
          <button className={`${cartStyle['button-add']}`} 
            onClick={agregarACarrito}
          >
            + Agregar carrito
          </button>
        </div>
      </div>
    </div>
  </li>
}

MealItem.defaultProps = {
  meal: {}
}

export default MealItem;
