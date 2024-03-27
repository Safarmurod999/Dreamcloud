import "./ProductCard.scss";
import cart from "../../assets/icons/shopping_cart.svg";
import Button from "../Button/Button";
function ProductCard({
  image,
  description,
  discount,
  product_name,
  weight,
  guarantee,
  capacity,
  size,
  price,
  orderControl,
}) {
  return (
    <li className="catalog__tab--panel--item card">
      {discount>0 && <div className="card--status">{discount}</div>}
      <div className="card--img">
        <img
          src={`https://dreamcloud-backend-e4327b791528.herokuapp.com/uploads/products/${image}`}
          alt={image}
        />
      </div>
      <div className="card--content">
        <div className="card--title title">{product_name}</div>
        <img
          src={`https://dreamcloud-backend-e4327b791528.herokuapp.com/uploads/products/${image}`}
          alt={image}
          className="card--img--mobile"
        />
        <ul className="card--about">
          <li>
            <p>Yuklama</p>
            <h6>
              {weight}
              <span>kg</span>
            </h6>
          </li>
          <li>
            <p>Kafolat</p>
            <h6>
              {guarantee}
              <span>yillik</span>
            </h6>
          </li>
          <li>
            <p>O'lchami</p>
            <h6>{size}</h6>
          </li>
          <li>
            <p>Sig'imi</p>
            <h6>
              {capacity}
              <span>kishilik</span>
            </h6>
          </li>
        </ul>
        <p className="card--text text">{description}</p>
        <p className="card--text text" style={{ marginBottom: "7px" }}>
          Narxi
        </p>
        <h6 className="card--price">
          {price}
          <span>so'm</span>
        </h6>
        <Button
          callback={() => orderControl()}
          title={"Buyurtna berish"}
          src={cart}
        />
      </div>
    </li>
  );
}

export default ProductCard;
