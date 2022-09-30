
function MealItem (props) {

  return <div className="card" style={{backgroundColor: "#d1e8ee"}}>
    <h3>{props.platillo}</h3>
    <label>{props.description}</label>
    <label className="float-bottom">${props.precio}</label>
  </div>
}

export default MealItem;