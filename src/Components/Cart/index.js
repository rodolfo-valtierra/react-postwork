import { useEffect, useState, useContext } from 'react';
import cartStyle from '../../styles/CartStyle.module.css'
import navStyle from '../../styles/navStyles.module.css'
import CartContext from '../../Context/CartContext'

function Cart (props) {
  const {count} = useContext(CartContext);

  return <div className={`${navStyle.nav}`} onClick={props.open}>
    <div className={`${cartStyle.round} ${cartStyle.cart} ${cartStyle['float-end']}`} style={{marginRight: '2rem'}}>
        Carrito: 
        <div className={`${cartStyle.round} ${cartStyle['counter-cart']}`} 
          align="center">
            {count()}
        </div>
    </div>
    <h2 className={`${navStyle.title}`} style={{width: '20%'}} align="center">React Meals</h2>
  </div>
}

export default Cart;