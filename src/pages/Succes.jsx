import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useCreditCard } from "../hooks/useCreditCard";
import imgSuccess from "../assets/success.png";
import "./Succes.css";
import { useEffect, useState } from "react";
import visaImg from "../assets/visa.png";
import masterCardImg from "../assets/masterCard.png";
import amexImg from "../assets/AmericanExpress.png";

const Succes = () => {
  const [norder, setNorder] = useState("");
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((store) => store.cart);
  const { numberCard, cleanNumberCard, typeCard, cleanTypeCard } =
    useCreditCard();
  const navigate = useNavigate();

  useEffect(() => {
    generarNumeroCompra();
    const date = new Date().toLocaleDateString();
    setDate(date);
  }, []);

  const generarNumeroCompra = () => {
    const min = 1000000000;
    const max = 9999999999;
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    setNorder(numeroAleatorio);
  };

  console.log(typeCard);

  return (
    <section className="section-success-principal">
      <div className="success-container">
        <div className="s-1">
          <h1 className="title-1">Thank you!</h1>
          <img className="img-success" src={imgSuccess} alt="" />
        </div>
        <p className="title-2">Your order was completed successfully.</p>
        <div className="summary-content-success">
          <p className="title-summary">Resumen de la compra</p>
          <p className="n-order-date-summary">{`N°Order: #${norder} - ${date}`}</p>
          <div className="metodo-pago">
            <p className="title-metodo-pago">Metodo de Pago</p>
            <div className="tipo-pago-seccions">
              <div className="tipo-pago-section-1">
                <p className="tipo-metodo-pago">
                  {typeCard === "American Express"
                    ? `Tarjeta de Credito AM EX`
                    : `Tarjeta de Credito ${typeCard}`}
                </p>
                <p className="terminacion-tarjeta">{`Terminada en ${
                  numberCard % 10000
                }`}</p>
              </div>
              <div className="tipo-pago-section-2">
                <img
                  className="img-tipo-tarjeta"
                  src={
                    typeCard === "Visa"
                      ? visaImg
                      : typeCard === "Mastercard"
                      ? masterCardImg
                      : typeCard === "American Express"
                      ? amexImg
                      : ""
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="t-price-producto-summary">
            <p>Producto</p>
            <p className="total-price-sumarry">{`$ ${totalPrice}.00`}</p>
          </div>
          <div className="t-price-envio-summary">
            <p>Envío</p>
            <p className="total-envio-summary">Gratis</p>
          </div>
          <div className="t-price-total-summary">
            <p>Tu pago</p>
            <p className="total-compra-summary">{`$ ${totalPrice}.00`}</p>
          </div>
          <button
            className="btnRegresarTienda"
            onClick={() => {
              cleanNumberCard();
              cleanTypeCard();
              dispatch(cleanCart());
              navigate("/home");
            }}
          >
            Regresar a la tienda
          </button>
        </div>
      </div>
    </section>
  );
};

export default Succes;
