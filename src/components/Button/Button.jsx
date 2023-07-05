import "./Button.scss";

function Button({ title, src, callback }) {
  return (
    <button className="button"  onClick={() => callback()} >
      {title}
      <img src={src} alt="image"/>
    </button>
  );
}

export default Button;
