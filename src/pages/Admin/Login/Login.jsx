import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../../utils/postData";
import "./Login.scss";

function Login() {
  const postLogin = (e) => {
    e.preventDefault();
    const userName = document.querySelector("#login").value;
    const password = document.querySelector("#password").value;
    const newUser = {
      userName,
      password,
    };
    postData("admin/login", newUser);
    document.querySelector("#login").value = "";
    document.querySelector("#password").value = "";
  };
  return (
    <section className="login">
      <form className="login__form">
        <div className="login__form--title">Kirish</div>
        <div className="login__form--name">
          {" "}
          <input type="text" placeholder="Login" id="login" />
        </div>
        <div className="login__form--password">
          <input type="text" placeholder="Parol" id="password" />
        </div>
        <Link to={"/admin"}>
          <button className="login__form--sign" onClick={(e) => postLogin(e)}>
            Kirish
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Login;
