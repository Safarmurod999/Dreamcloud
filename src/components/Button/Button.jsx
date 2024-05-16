import "./Button.scss";

function Button({ title, src, callback }) {
  return (
    <button className="button-main" onClick={() => callback()}>
      {title}
      {src && <img src={src} alt="image" />}
    </button>
  );
}

export default Button;
