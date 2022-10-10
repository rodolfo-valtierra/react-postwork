import { useContext } from 'react';
import cartStyle from '../../styles/CartStyle.module.css'
import CartContext from '../../Context/CartContext'

function Cart (props) {
  const {count} = useContext(CartContext);

  return <div className={`${cartStyle.round} ${cartStyle.cart} `} style={{marginRight: '2rem'}} onClick={props.open}>
    Carrito: 
    <div className={`${cartStyle.round} ${cartStyle['counter-cart']}`} 
      align="center">
        {count}
    </div>
  </div>
}

export default Cart;