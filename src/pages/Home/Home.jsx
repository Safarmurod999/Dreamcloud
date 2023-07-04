import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button/Button";
import arrow from "../../assets/icons/arrow.svg";
import range from "../../assets/icons/range.svg";
import bed from "../../assets/images/home/home-main.png";
import play_btn from "../../assets/icons/play-btn.svg";
import "./Home.scss";
import { tabData } from "../../database/products";
import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { technologies } from "../../database/technologies";

function Home() {
  const [active, setActive] = useState(0);
  const { data: statistics } = useFetch("statistics");
  const { data: products, loading } = useFetch("products");
  console.log(tabData);

  function videoControl(id) {
    const video = document.getElementById(`${id}`);
    // const videoBtn = document.getElementById(`${2*id}`);
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  return (
    !loading && (
      <main>
        <section className="home">
          <div className="container">
            <div className="home__left">
              <h1 className="home__title">Kechalari sokin dam oling</h1>
              <img className="home__main" src={bed} alt="bed" />
              <Button title={"Kategoriyalar"} src={arrow} />
              <img src={range} alt="range" />
            </div>
            <div className="home__right"></div>
          </div>
        </section>
        <section className="features">
          <div className="container">
            <ul className="features__list">
              <li className="features__list--item">
                <h3>{statistics.experience}</h3>
                <p>yillik tajriba</p>
              </li>
              <li className="features__list--item">
                <h3>{statistics.clients}</h3>
                <p>mamnun mijozlar</p>
              </li>
              <li className="features__list--item">
                <h3>{statistics.warranty}</h3>
                <p>yillik kafolat</p>
              </li>
              <li className="features__list--item">
                <h3>{statistics.delivery}</h3>
                <p>kunda yetkazish</p>
              </li>
            </ul>
          </div>
        </section>
        <section id="catalog" className="catalog">
          <div className="container">
            <div className="catalog__title title">Bizning mahsulotlar</div>
            <div className="catalog__tab">
              <ul className="catalog__tab--list">
                {tabData.categories.map((el) => {
                  return (
                    <li
                      onClick={() => setActive(el.id)}
                      className={`catalog__tab--list--item ${
                        active == el.id && "active"
                      }`}
                      key={el.id}
                    >
                      {el.category}
                    </li>
                  );
                })}
              </ul>
              <ul className="catalog__tab--panel">
                {tabData.products.map((el) => {
                  if (el.category_id == active || active == 0) {
                    return (
                      <ProductCard key={el.id} {...el} />
                      // <li
                      //   className="catalog__tab--panel--item card"
                      //   key={el.id}
                      // >
                      //   <div className="card--img">
                      //     <img
                      //       src={el.product_images}
                      //       alt={el.product_images}
                      //     />
                      //   </div>
                      //   <div className="card--content">
                      //     <div className="card--title title">{el.name}</div>
                      //     <img src={el.product_images} alt={el.product_images} className="card--img--mobile" />
                      //     <ul className="card--about">
                      //       <li>
                      //         <p>Yuklama</p>
                      //         <h6>
                      //           {el.weight}
                      //           <span>kg</span>
                      //         </h6>
                      //       </li>
                      //       <li>
                      //         <p>Kafolat</p>
                      //         <h6>
                      //           {el.warranty}
                      //           <span>yillik</span>
                      //         </h6>
                      //       </li>
                      //       <li>
                      //         <p>O'lchami</p>
                      //         <h6>{el.size}</h6>
                      //       </li>
                      //       <li>
                      //         <p>Sig'imi</p>
                      //         <h6>
                      //           {el.capacity}
                      //           <span>kishilik</span>
                      //         </h6>
                      //       </li>
                      //     </ul>
                      //     <p className="card--text text">
                      //       Penatibus viverra gravida rhoncus in. At turpis
                      //       morbi ante tortor a est. Habitant adipiscing ut sed
                      //       pulvinar tellus, ut urna, fermentum. Porttitor
                      //       senectus lorem rhoncus facilisi ac dictum varius
                      //       egestas.
                      //     </p>
                      //     <p
                      //       className="card--text text"
                      //       style={{ marginBottom: "7px" }}
                      //     >
                      //       Narxi
                      //     </p>
                      //     <h6 className="card--price">
                      //       {el.cost}
                      //       <span>so'm</span>
                      //     </h6>
                      //     <Button title={"Buyurtna berish"} src={cart}/>
                      //   </div>
                      // </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </section>
        <section id="stock" className="stock">
          <div className="container">
            <div className="stock__title title">Aksiyadagi mahsulotlar</div>
            <ul className="stock--list">
              {tabData.products.map((el) => {
                if (el.new_cost) {
                  return <ProductCard key={el.id} {...el} />;
                }
              })}
            </ul>
          </div>
        </section>
        <section className="technologies">
          <div className="container">
            <div className="technologies__title title">
              Ishlab chiqarish texnologiyalari
            </div>
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                678: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              // modules={[Navigation, Pagination, Scrollbar]}
              loop={true}
              // navigation
            >
              {technologies.map((el) => {
                return (
                  <SwiperSlide key={el.id}>
                    <div className="technologies--card">
                      <div className="technologies--card--title">{el.name}</div>
                      <video
                        src={el.thumbnail}
                        className="technologies--card--video"
                        id={el.id}
                      ></video>
                      <div
                        className="technologies--card--btn"
                        onClick={() => videoControl(el.id)}
                      >
                        <img src={play_btn} alt="play-btn" />
                      </div>
                      <p className="technologies--card--description">
                        {el.description}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
        <section id="about" className="about">
          <div className="container">
            <div className="about__top">
              <div className="about__top--left">
                <div className="about__title">
                  Dream Cloud kompaniyasi haqida
                </div>
                <p className="abput__content">
                  Penatibus viverra gravida rhoncus in. At turpis morbi ante
                  tortor a est. Habitant adipiscing ut sed pulvinar tellus, ut
                  urna, fermentum:
                </p>
                <ul className="about__list">
                  <li className="about__list--item">
                    Penatibus viverra gravida rhoncus in.
                  </li>
                  <li className="about__list--item">
                    Dolor integer in interdum viverra risus dolor enim.
                  </li>
                  <li className="about__list--item">
                    Turpis senectus eu, eget aenean nulla pellentesque sed ut
                    tempor.
                  </li>
                </ul>
              </div>
              <div className="about__top--right"></div>
            </div>
          </div>
        </section>
      </main>
    )
  );
}

export default Home;
