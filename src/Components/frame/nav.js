import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import navStyles from '../../styles/navStyles.module.css'
import Cart from './Cart'

function Navigation(props) {
  const { count } = useContext(CartContext);

  return <nav className={`${navStyles.nav}`}>
    <ul>
      <li>
        <h2>
          <Link to="/">React meals</Link>
        </h2>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/menu/:mealId">Home</Link>
      </li>
      <li>
        <Link to="/checkout">Checxout</Link>
      </li>
    </ul>
    <Cart open={props.open}/>
  </nav>;
}

export default Navigation;
