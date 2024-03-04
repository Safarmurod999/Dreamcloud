import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { BASE_URL } from "../../../const/const";

function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const postLogin = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}auth/login`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      }).then(async (res) => {
        let response = await res.json();
        if (response.data) {
          setTimeout(() => navigate("/admin"), 1000);
          localStorage.setItem(
            "access_token",
            JSON.stringify(response.data["access_token"])
          );
          localStorage.setItem(
            "username",
            JSON.stringify(response.data["username"])
          );
        }
      });
    } catch (error) {
      console.log(error.message);
    }
    setLogin({ username: "", password: "" });
  };
  return (
    <section className="login">
      <form className="login__form">
        <div className="login__form--title">Kirish</div>
        <div className="login__form--name">
          {" "}
          <input
            type="text"
            placeholder="Login"
            id="login"
            name="username"
            value={login.username}
            onChange={onChangeHandler}
          />
        </div>
        <div className="login__form--password">
          <input
            type="text"
            placeholder="Parol"
            id="password"
            name="password"
            value={login.password}
            onChange={onChangeHandler}
          />
        </div>
        <Link to={"/admin"}>
          <button
            className="login__form--sign"
            type="submit"
            onClick={(e) => postLogin(e)}
          >
            Kirish
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Login;
