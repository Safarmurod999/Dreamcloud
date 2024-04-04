import "./Navbar.scss";
import logo from "../../assets/images/navbar/logo.svg";
import call from "../../assets/images/navbar/call.svg";
import open__nav from "../../assets/images/navbar/open.svg";
import close__nav from "../../assets/images/navbar/close.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const openNav = () => {
    document.getElementById("navbar__menus").style.right = "0";
  };
  const closeNav = () => {
    document.getElementById("navbar__menus").style.right = "-100%";
  };

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);
  const orderControl = () => {
    document.querySelector(".order").style.display = "flex";
  };
  return (
    <header>
      <nav className={`navbar ${!show && "shrink"}`}>
        <div className="container">
          <div className="navbar__logo">
            <a href="#">
              {" "}
              <img src={logo} alt="logo" />
            </a>
          </div>
          <button
            id="open"
            className="navbar__toggle"
            onClick={() => openNav()}
          >
            <img src={open__nav} alt="open" />
          </button>
          <div id="navbar__menus" className="navbar__menus">
            <button
              id="close"
              className="navbar__toggle"
              onClick={() => closeNav()}
            >
              <img src={close__nav} alt="close" />
            </button>
            <ul className="navbar__list">
              <li className="navbar__list--item">
                <a href="#catalog">Katalog</a>
              </li>
              <li className="navbar__list--item">
                <a href="#stock">Aksiya</a>
              </li>
              <li className="navbar__list--item">
                <a href="#about">Biz haqimizda</a>
              </li>
              <li className="navbar__list--item">
                <a href="#address">Manzilimiz</a>
              </li>
              <li className="navbar__list--item">
                <a href="#contact">Aloqa</a>
              </li>
            </ul>
            <div className="navbar__contact">
              <a href="tel:+998901234567">
                <img src={call} alt="call" /> +998 90 123 45 67
              </a>
              <Link to="/login" className="button">Kirish</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
