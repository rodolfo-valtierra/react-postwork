import cartStyle from '../../styles/CartStyle.module.css'
import navStyle from '../../styles/navStyles.module.css'

function Cart (props) {

  return <div class={`${navStyle.nav}`}>
    <div class={`${cartStyle.round} ${cartStyle.cart} ${cartStyle['float-end']}`} style={{marginRight: '2rem'}}>
      Carrito: 
      <div className={`${cartStyle.round} ${cartStyle['counter-cart']}`} 
        align="center">
          {props.amount.length}
      </div>
    </div>
    <h2 className={`${navStyle.title}`} style={{width: '20%'}} align="center">React Meals</h2>
  </div>
}

export default Cart;
