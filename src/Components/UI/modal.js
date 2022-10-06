import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import styles from "../../styles/Modal.module.css";
import cartStyle from '../../styles/CartStyle.module.css'
import mealStyle from '../../styles/meals.module.css'

const ModalOverlay = (props) => <div className={styles.modal} onBlur={props.onBlur}>
  <div className={styles.header}>
    <h2>Cart List</h2>
  </div>
  <div className={styles.content}>
    { props.cart.map( el => <div className={`${cartStyle['seccion-buy']} ${mealStyle['flex-wrap']}`}>
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
      <label className={`col-half ${mealStyle['row-reverse']}`}>${props.total}</label>
    </div>
  </div>
  <div className={`${styles.actions}`}>
    <button onClick={props.onConfirm}>Cerrar</button>
    <button onClick={props.onConfirm}>Ordenar</button>
  </div>
</div>;

ModalOverlay.defaultProps = {
  cart: []
};

function Modal(props) {
  const [useTotal, setTotal] = useState(0);

  useEffect(() => {
    setTotal(calcularTotal())
  }, [props.cart])

  const calcularTotal = () => props.cart.reduce((acc, el) => acc+(el.precio*el.cantidad),0);

  return ReactDOM.createPortal(<>
      <div className={styles.backdrop} onClick={props.onConfirm}></div>,
      <ModalOverlay {...props} total={useTotal}/> 
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;