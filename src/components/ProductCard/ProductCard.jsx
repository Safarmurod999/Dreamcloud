import "./ProductCard.scss";
import cart from "../../assets/icons/shopping_cart.svg";
import Button from "../Button/Button";
function ProductCard({
  id,
  product_images,
  body,
  new_cost,
  name,
  weight,
  warranty,
  capacity,
  size,
  cost,
}) {
  return (
    <li className="catalog__tab--panel--item card">
      {new_cost && <div className="card--status">{new_cost}</div>}
      <div className="card--img">
        <img src={product_images} alt={product_images} />
      </div>
      <div className="card--content">
        <div className="card--title title">{name}</div>
        <img
          src={product_images}
          alt={product_images}
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
              {warranty}
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
        <p className="card--text text">{body}</p>
        <p className="card--text text" style={{ marginBottom: "7px" }}>
          Narxi
        </p>
        <h6 className="card--price">
          {cost}
          <span>so'm</span>
        </h6>
        <Button title={"Buyurtna berish"} src={cart} />
      </div>
    </li>
  );
}

export default ProductCard;
