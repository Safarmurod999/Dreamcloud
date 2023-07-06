import { useEffect, useState } from "react";
import backtop from "../../assets/icons/backtop.svg";
import "./BackTop.scss";

function BackTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    showButton && (
      <button className="backtop" onClick={scrollToTop}>
          <img src={backtop} alt="backtop" />
      </button>
    )
  );
}

export default BackTop;
