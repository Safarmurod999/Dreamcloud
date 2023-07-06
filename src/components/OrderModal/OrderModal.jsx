import { useState } from "react";
import "./OrderModal.scss";
import close from "../../assets/images/navbar/close.svg";
function OrderModal() {
  const [count, setCount] = useState(1);
  const countHandler = (e, payload) => {
    e.preventDefault();

    if (payload == "+") {
      setCount(count + 1);
    } else {
      if (count < 0) {
        setCount(0);
      } else setCount(count - 1);
    }
  };
  const closeOrder = () => {
    document.querySelector(".order").style.display = "none";
  };
  return (
    <div className="order">
      <form className="order__form">
        <div className="order__close" onClick={()=>closeOrder()}>
          <img src={close} alt="close" />
        </div>
        <div className="order__form--title">Buyurtma qilish</div>
        <input className="order__form--name" type="text" minLength={1} />
        <div className="order__form--number">
          <span>+998</span>
          <input type="text" placeholder="Raqamingizni yozing" />
        </div>
        <div className="order__form--category">
          <label className="order__form--label" htmlFor="category">
            Mahsulotlarni toifasini tanlang
          </label>
          <select id="category" className="order__form--select"></select>
        </div>
        <div className="order__form--count">
          <label className="order__form--label" htmlFor="count">
            Miqdorni tanlang
          </label>
          <div id="count" className="order__form--group">
            <button
              className="order__form--btn"
              onClick={(e) => countHandler(e, "+")}
            >
              {" "}
              +{" "}
            </button>
            <div className="order__form--amount">{count}</div>
            <button
              className="order__form--btn"
              onClick={(e) => countHandler(e, "-")}
            >
              {" "}
              -{" "}
            </button>
          </div>
        </div>
        <button className="order__btn" type="submit">
          Yuborish
        </button>
      </form>
    </div>
  );
}

export default OrderModal;
