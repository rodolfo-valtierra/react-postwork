import ReactDOM from 'react-dom'
import { useContext } from 'react'
import styles from "../../styles/Modal.module.css";
import cartStyle from '../../styles/CartStyle.module.css'
import mealStyle from '../../styles/meals.module.css'
import CartContext from '../../Context/CartContext'

const ModalOverlay = (props) =>  {

  const changeAmount = () => {
    props.add({type: 'ADD', })
  }

  <div className={styles.modal} onBlur={props.onBlur}>
    <div className={styles.header}>
      <h2>Cart List</h2>
    </div>
    <div className={styles.content}>
      { 
        props.productos.map( (el, i) => <div key={i}
          className={`${cartStyle['seccion-buy']} ${mealStyle['flex-wrap']}`}>
          <div className="col-half">
              {el.platillo}
              <div className={`${cartStyle['price']}`}> 
                $ {el.precio}
                <span> x{el.cantidad}</span>
              </div>
            </div>
            <div className={`col-half ${mealStyle['row-reverse']}`}>
              <div>
                <button> - </button>
                <button> + </button>
              </div>
            </div>
          </div>
        )
      }
      <div className={` ${cartStyle['seccion-buy']} ${mealStyle['flex-wrap']}`} style={{borderBottom: 'none'}}>
        <label className="col-half">Total</label>
        <label className={`col-half ${mealStyle['row-reverse']}`}>$ {props.total}</label>
      </div>
    </div>
    <div className={`${styles.actions}`}>
      <button onClick={props.onClose}>Cerrar</button>
      <button onClick={props.onClose}>Ordenar</button>
    </div>
  </div>;
}

ModalOverlay.defaultProps = {
  cart: []
};

function Modal(props) {
  const useCartContext = useContext(CartContext)

  return ReactDOM.createPortal(<>
      <div className={styles.backdrop} onClick={props.onConfirm}></div>,
      <ModalOverlay {...useCartContext} onClose={props.onConfirm} add={props.add}/> 
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;