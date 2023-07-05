import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button/Button";
import arrow from "../../assets/icons/arrow.svg";
import range from "../../assets/icons/range.svg";
import bed from "../../assets/images/home/home-main.png";
import play_btn from "../../assets/icons/play-btn.svg";
import video from "../../../public/videos/about-video.mp4";
import showroom from "../../assets/images/home/showroom.png";
import geolocation from "../../assets/icons/geolocation.svg";
import address_img from "../../assets/images/home/address.png";
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
import { features } from "../../database/features";
import AddressModal from "../../components/AddressModal/AddressModal";

function Home() {
  const [active, setActive] = useState(0);
  const { data: statistics } = useFetch("statistics");
  const { data: products, loading } = useFetch("products");
  const { data: carousel } = useFetch("carousel");
  const { data: address } = useFetch("address");
  console.log(products);
  console.log(carousel);
  console.log(tabData);
  console.log(address);

  function videoControl(id) {
    const video = document.getElementById(`${id}`);
    console.log("play");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  const modalControl = () => {
    document.querySelector(".modal").style.display = "flex";
  };
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
                    return <ProductCard key={el.id} {...el} />;
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
                <div className="about__title title">
                  Dream Cloud kompaniyasi haqida
                </div>
                <p className="about__content text">
                  Penatibus viverra gravida rhoncus in. At turpis morbi ante
                  tortor a est. Habitant adipiscing ut sed pulvinar tellus, ut
                  urna, fermentum:
                </p>
                <ul className="about__list about__list--unordered">
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
              <div className="about__top--right">
                <video
                  src={video}
                  id="about__video"
                  className="about__video"
                ></video>
                <div
                  className="about__video--btn"
                  onClick={() => videoControl("about__video")}
                >
                  <img src={play_btn} alt="play-btn" />
                </div>
              </div>
            </div>
            <div className="about__bottom">
              <div className="about__bottom--left">
                <img src={showroom} alt="showroom" />
              </div>
              <div className="about__bottom--right">
                <p className="about__content text">
                  Libero erat praesent ullamcorper eget tortor sed et. Nec id
                  lobortis gravida vitae. Scelerisque id fusce vitae ut. Integer
                  sed vulputate sed nec. Arcu id mattis erat et id.
                </p>
                <ol className="about__list about__list--ordered" start={1}>
                  <li className="about__list--item">
                    Id risus phasellus laoreet eget. A nec pulvinar.
                  </li>
                  <li className="about__list--item">
                    Eu justo, tincidunt fringilla diam nulla.
                  </li>
                  <li className="about__list--item">
                    Amet, nullam cras lacus, fermentum leo tellus sagittis.
                  </li>
                  <li className="about__list--item">
                    Facilisi mauris condimentum sagittis odio rhoncus semper.
                  </li>
                </ol>
                <p className="about__content text">
                  Ac tortor volutpat pellentesque mauris nisi, praesent. Et
                  tempus accumsan est elementum feugiat arcu mauris tincidunt.
                  Eget faucibus pharetra et luctus eget ut fames. A cursus
                  elementum egestas eu scelerisque id.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="advantages">
          <div className="container">
            <div className="advantages__title title">Nega bizni tanlashadi</div>
            <ul className="advantages__row">
              {features.map((el) => {
                return (
                  <li key={el.id} className="advantages__row--item">
                    <img src={el.image} alt={el.image} />
                    <div>{el.title}</div>
                    <p>{el.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section id="address" className="address">
          <div className="container">
            <div className="address__left">
              <div className="address__title title">Manzilimiz</div>
             <img src={address_img} alt={address_img} className="address__left--img" />
              <h4 className="address--location">{address[0].location}</h4>
             
              <p className="address--destination text">
                {address[0].destination}
              </p>
              <AddressModal
                src={
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96030.28356155523!2d69.09781803620774!3d41.22293936409461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae619aa5306045%3A0x781013294d66e773!2z0JzQsNGC0YDQsNGB0Ysg0LIg0YLQsNGI0LrQtdC90YLQtQ!5e0!3m2!1sru!2s!4v1688566708273!5m2!1sru!2s"
                }
              />
              <Button
                title={"Geolokatsiya"}
                src={geolocation}
                callback={modalControl}
              />
            </div>
            <div className="address__right">
              <img src={address_img} alt={address_img} />
            </div>
          </div>
        </section>
      </main>
    )
  );
}

export default Home;
