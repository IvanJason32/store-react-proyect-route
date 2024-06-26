import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";
import CardCart from "../Components/CardCart";
import carritoVacioImg from "../assets/carritoVacio.png";

const Carrito = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useSelector((store) => store.cart);

  console.log(items);

  return (
    <section className="cart-container-principal">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        {totalItems === 0 ? (
          <div className="content-card-empty">
            <img className="img-carrito-empty" src={carritoVacioImg} alt="" />
            <p className="t-carrito-empty-1">¡Start your shopping cart!</p>
            <p className="t-carrito-empty-2">
              Add products and earn free shipping 
            </p>
            <button
              className="btn-carrito-empty"
              onClick={() => navigate("/categorias")}
            >
              Discover Products
            </button>
          </div>
        ) : (
          <>
            <div className="content-card-body">
              <div className="cart-content">
                {items.map((product) => {
                  return <CardCart key={product.item_id} product={product} />;
                })}
              </div>
              <div className="summary-content">
                <p className="t-resumen-compra">Purchase Resume</p>
                <div className="t-price-producto">
                  <p>Product</p>
                  <p className="total-price">{`$ ${totalPrice}.00`}</p>
                </div>
                <div className="t-price-envio">
                  <p>Shipping fee</p>
                  <p className="total-envio">Free</p>
                </div>
                <div className="t-price-total">
                  <p>Total</p>
                  <p className="total-compra6">{`$ ${totalPrice}.00`}</p>
                </div>
                <button
                  className="btnPagar"
                  onClick={() => navigate("/checkout")}
                >
                  Keep Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="summary-container"></div>
    </section>
  );
};

export default Carrito;
