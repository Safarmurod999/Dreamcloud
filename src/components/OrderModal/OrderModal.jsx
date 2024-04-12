import { useState } from "react";
import "./OrderModal.scss";
import close from "../../assets/images/navbar/close.svg";
import success_img from "../../assets/images/home/success.png";
import { postData } from "../../utils/postData";
import useFetch from "../../hooks/useFetch";
import Spinner from "../Spinner/Spinner";

function OrderModal({ data }) {
  let { id } = data;
  const [newOrder, setOrder] = useState({
    customer_name: "",
    mobile_phone: "",
    count: 1,
  });
  const { data: products, loading, error } = useFetch("products");

  const onChangeHandler = (e) => {
    setOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const countHandler = (e, payload) => {
    e.preventDefault();
    if (payload == "+") {
      setOrder({ ...newOrder, count: newOrder.count + 1 });
    } else {
      if (newOrder.count == 1) {
        setOrder({ ...newOrder, count: 1 });
      } else setOrder({ ...newOrder, count: newOrder.count - 1 });
    }
  };
  const closeOrder = () => {
    document.querySelector(".order").style.display = "none";
    document.querySelector(".success").style.display = "none";
  };
  const postOrder = (e) => {
    e.preventDefault();
    let phoneValid = /^9989[012345789][0-9]{7}$/;

    newOrder.mobile_phone = "998" + newOrder.mobile_phone;

    if (phoneValid.test(newOrder.mobile_phone)) {
      postData("orders", { ...newOrder, product_id: id });
      document.querySelector(".order__form").style.display = "none";
      document.querySelector(".success").style.display = "flex";
      setOrder({
        customer_name: "",
        mobile_phone: "",
        product_id: 1,
        count: 1,
      });
    } else {
      alert("Invalid phone number");
    }
  };
  if (loading) {
    return <Spinner position={"full"} />;
  }
  if (error) {
    console.log(error);
  }
  return (
    products && (
      <>
        <div className="order">
          <form className="order__form">
            <div className="order__close" onClick={() => closeOrder()}>
              <img src={close} alt="close" />
            </div>
            <div className="order__form--title">Buyurtma qilish</div>
            <input
              className="order__form--name"
              type="text"
              minLength={1}
              placeholder="Ismingiz"
              name="customer_name"
              value={newOrder.customer_name}
              onChange={onChangeHandler}
              required
            />
            <div className="order__form--mobile_phone">
              <span>+998</span>
              <input
                className="order__form--phone"
                type="text"
                name="mobile_phone"
                placeholder="Raqamingizni yozing"
                value={newOrder.mobile_phone}
                onChange={onChangeHandler}
                maxLength={9}
                required
              />
            </div>
            <div className="order__form--category">
              <label className="order__form--label" htmlFor="category">
                Mahsulotlarni toifasini tanlang
              </label>
              <select
                id="category"
                className="order__form--select"
                name="product_id"
                value={id}
                onChange={onChangeHandler}
                required
              >
                {products.data.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.product_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="order__form--count">
              <label className="order__form--label">Miqdorni tanlang</label>
              <div id="count" className="order__form--group">
                <button
                  className="order__form--btn"
                  onClick={(e) => countHandler(e, "-")}
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  className="order__form--amount"
                  readOnly
                  value={newOrder.count}
                />
                <button
                  className="order__form--btn"
                  onClick={(e) => countHandler(e, "+")}
                >
                  {" "}
                  +{" "}
                </button>{" "}
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
          <div className="success">
            <div className="success--title">
              Arizangiz muvaffaqiyatli yuborildi
            </div>
            <img
              src={success_img}
              alt="succes_img"
              className="success--image"
            />
            <p className="success--text">
              Tez orada operatorlarimiz siz bilan bog’lanishadi
            </p>
            <button className="order__btn" onClick={closeOrder}>
              Ok
            </button>
          </div>
        </div>
      </>
    )
  );
}

export default OrderModal;
