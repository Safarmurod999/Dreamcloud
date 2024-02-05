import { useState } from "react";
import "./OrderModal.scss";
import close from "../../assets/images/navbar/close.svg";
import { postData } from "../../utils/postData";
import useFetch from "../../hooks/useFetch";

function OrderModal() {
  const [count, setCount] = useState(1);
  const [newOrder, setOrder] = useState({ name: "", number: "", productName: "", count: 1 })
  const onChangeHandler = (e) => {
    setOrder({ ...newOrder, [e.target.name]: e.target.value })
  }
  const { data: products, loading } = useFetch("products");
  const countHandler = (e, payload) => {
    e.preventDefault();
    if (payload == "+") {
      setOrder({ ...newOrder, count: newOrder.count + 1 })
    } else {
      if (newOrder.count < 0) {
        setOrder({ ...newOrder, count: 1 })
      } else setOrder({ ...newOrder, count: newOrder.count - 1 })
    }
  };
  const closeOrder = () => {
    document.querySelector(".order").style.display = "none";
  };
  const postOrder = (e) => {
    e.preventDefault();
    postData("orders", newOrder);
    document.querySelector(".order").style.display = "none";
    setOrder({ name: "", number: "", productName: "", count: 1 })
  };
  return (
    <div className="order">
      <form className="order__form">
        <div className="order__close" onClick={() => closeOrder()}>
          <img src={close} alt="close" />
        </div>
        <div className="order__form--title">Buyurtma qilish</div>
        <input className="order__form--name" type="text" minLength={1} placeholder="Ismingiz" name="name" value={newOrder.name} onChange={onChangeHandler} />
        <div className="order__form--number">
          <span>+998</span>
          <input
            className="order__form--phone"
            type="text"
            name="number"
            placeholder="Raqamingizni yozing"
            value={newOrder.number} onChange={onChangeHandler}
          />
        </div>
        <div className="order__form--category">
          <label className="order__form--label" htmlFor="category">
            Mahsulotlarni toifasini tanlang
          </label>
          <select id="category" className="order__form--select" name="productName" value={newOrder.productName} onChange={onChangeHandler}>
            {products.map((el) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="order__form--count">
          <label className="order__form--label">
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
            <input className="order__form--amount" readOnly value={newOrder.count} />
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
