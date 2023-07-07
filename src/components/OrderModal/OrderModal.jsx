import { useState } from "react";
import "./OrderModal.scss";
import close from "../../assets/images/navbar/close.svg";
import { postData } from "../../utils/postData";
import { tabData } from "../../database/products";

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
  const postOrder = (e) => {
    e.preventDefault();
    const name = document.querySelector(".order__form--name").value;
    const number = document.querySelector(".order__form--phone").value;
    const productName = document.querySelector(".order__form--select").value;
    const count = document.querySelector(".order__form--amount").innerHTML;
    console.log(name, number,productName, count);
    const newOrder = {
      name,
      number,
      productName,
      count,
    };
    console.log(newOrder);
    postData("api/orders", newOrder);
  };
  return (
    <div className="order">
      <form className="order__form">
        <div className="order__close" onClick={() => closeOrder()}>
          <img src={close} alt="close" />
        </div>
        <div className="order__form--title">Buyurtma qilish</div>
        <input className="order__form--name" type="text" minLength={1} />
        <div className="order__form--number">
          <span>+998</span>
          <input
            className="order__form--phone"
            type="text"
            placeholder="Raqamingizni yozing"
          />
        </div>
        <div className="order__form--category">
          <label className="order__form--label" htmlFor="category">
            Mahsulotlarni toifasini tanlang
          </label>
          <select id="category" className="order__form--select">
            {tabData.products.map((el) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
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
        <button
          className="order__btn"
          type="submit"
          onClick={(e) => postOrder(e)}
        >
          Yuborish
        </button>
      </form>
    </div>
  );
}

export default OrderModal;
