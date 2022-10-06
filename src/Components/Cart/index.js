import { useEffect, useState } from 'react';
import cartStyle from '../../styles/CartStyle.module.css'
import navStyle from '../../styles/navStyles.module.css'

function Cart (props) {
  const [useCounter, setCounter] = useState(0);
 
  useEffect(() => {
    setCounter(calculator());
  }, [props.amount])

  const calculator = () => props.amount.reduce((acc, el) => parseInt(acc)+parseInt(el.cantidad), 0);

  return <div className={`${navStyle.nav}`} onClick={props.open}>
    <div className={`${cartStyle.round} ${cartStyle.cart} ${cartStyle['float-end']}`} style={{marginRight: '2rem'}}>
        Carrito: 
        <div className={`${cartStyle.round} ${cartStyle['counter-cart']}`} 
          align="center">
            {useCounter}
        </div>
    </div>
    <h2 className={`${navStyle.title}`} style={{width: '20%'}} align="center">React Meals</h2>
  </div>
}

export default Cart;