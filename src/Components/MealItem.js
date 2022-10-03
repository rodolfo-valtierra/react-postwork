import { useState } from 'react'

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

  return <div className="card" style={{backgroundColor: "#d1e8ee"}}>
    <div >
      <h3>{props.platillo}</h3>
      <label>{props.description}</label>
      <div>${props.precio}</div>
    </div>
    <div> 
      <select defaultValue="1" onChange={changeCantidad}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <button onClick={agregarACarrito} value={props.id}>Agregar carrito</button>
    </div>
  </div>
}

export default MealItem;