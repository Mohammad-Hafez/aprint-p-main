import React, { useState, useEffect} from "react";
import styles from "../styles/home/home.module.css";
import Helmet from "../components/Helmet";
import { Row, Col, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import deliveryImage from "../assets/images/why/delivery-truck.png";
import payment from "../assets/images/why/online-payment.png";
import checking from "../assets/images/why/checking.png";
import brush from "../assets/images/why/brush.png";
import { MdKeyboardArrowLeft } from "react-icons/md";
import d1 from "../assets/images/download/svgexport-4.png";
import d2 from "../assets/images/download/svgexport-5.png";
import d3 from "../assets/images/download/svgexport-6.png";
import { FaWhatsapp } from "react-icons/fa";
import elipse1 from "../assets/images/contact/Mask Group.png";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import axios from "axios";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";
import Loader from "../components/Loader";
import { AiOutlineSearch } from "react-icons/ai";
import SwiperCards from "../components/Home/Brands";
import ClientsSwiper from "../components/Home/Clients";
import AppImage from "../assets/app.png";
import { useDispatch, useSelector } from "react-redux";
import { SendContact } from "../store/ContactSlice";
import { getSearch } from "../store/HomeSlice";
const Home = ({ lang }) => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [Clients, setClients] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [contactRes, setContactRes] = useState("");
  const [modalShowٍSuccess, setModalShowSuccess] = useState(false);
  const [options, setOprions] = useState([]);
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Need"),
    contactEmail: Yup.string().email("Worng").required("Need"),
    contactPhone: Yup.number().required("Need"),
    contactMessage: Yup.string().required("Need"),
  });

  const onServicesSuccess = (data) => {
    setServices(data.data.data.services);
    setProducts(data.data.data.products);
    setBrands(data.data.data.brands);
    setClients(data.data.data.clients);
    setOprions(data.data.data.options);
  };
  const onServicesError = (error) => {
  };
  const servicesFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/home`, {
      headers: {
        lang: lang === "ar" ? "ar" : "en",
      },
    });
  };
  const initialValues = {
    fullName: "",
    contactEmail: "",
    contactPhone: "",
    contactMessage: "",
  };
  const dispatch = useDispatch();
  const onSubmit = (res) => {
    const data = {
      name: res.fullName,
      phone: res.contactPhone,
      email: res.contactEmail,
      message: res.contactMessage,
    };
    dispatch(SendContact(data))
      .unwrap()
      .then(() => {
        window.location.reload();
      });
  };

  const {
    isLoading: serviceLoading,
    error: servicesError,
    refetch: servicesRe,
  } = useQueryHook(
    "services",
    onServicesSuccess,
    onServicesError,
    servicesFetcher
  );

  useEffect(() => {
    servicesRe();
  }, [servicesRe]);
  const [search, setSearch] = useState("");

  let typingTimer; 
  let doneTypingInterval = 1000;
  const doneTyping = () => {
    dispatch(getSearch(search));
    setToggleSearch(true);
  };
  const { SearchArr } = useSelector((state) => state.HomeSlice);
  const [toggelSearch, setToggleSearch] = useState(false);

  const SerchResult =
    SearchArr &&
    SearchArr.slice(0, 5).map((ele) => {
      return (
        <NavLink
          to={`${
            ele.type === "product"
              ? `/products/${ele.id}`
              : `/services/${ele.id}`
          }`}
          key={ele.id}
          className={styles.srarch_li}
          onClick={() => {
            setToggleSearch(false);
          }}
        >
          <p>{ele.title}</p>
          <img src={ele.image} alt={ele.name} width={100} height={60} />
        </NavLink>
      );
    });
  return (
    <Helmet title={"home"}>
      <ModalMe
        show={modalShow}
        lang={lang}
        onHide={() => setModalShow(false)}
        header={lang === "ar" ? "! حدث خطأ" : "Error Occurred !"}
        body={
          lang === "ar"
            ? "لقد حدث خطأ يرجي المحاولة مرة اخري"
            : "Error Occurred please try agian later!"
        }
      />

      {contactRes && (
        <ModalMe
          show={modalShowٍSuccess}
          lang={lang}
          onHide={() => setModalShowSuccess(false)}
          body={contactRes}
        />
      )}
      <section className={`${styles.hero_section} container mb-5`}>
        <div className={styles.hero_content}>
          <h1 className={`${styles.mainHeading} font-quest`}>
          Low Cost Banner Printing
          </h1>
          <h2 className={`${styles.mainHeading2} font-quest`}>
          Trade Prices
          </h2>
          <h2 className={`${styles.mainHeading2} font-quest`}>
          High Quality
          </h2>
        </div>
        <div className={`${styles.Search} `}>
          <div className={`${styles.Search_section} ${styles.Search}`}>
            <AiOutlineSearch />
            <input
              value={search}
              type="search"
              placeholder="SEARCH  ... Find Out Our Products or Services"
              onChange={(e) => {
                setSearch(e.target.value);
                clearTimeout(typingTimer);
              }}
              onKeyUp={() => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
              }}
            />
            <button>Search</button>
            <div className={styles.searchResult}>
              {search.length > 0 && SearchArr && toggelSearch && (
                <ul>{SerchResult}</ul>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <div className="container">
        <section className={`${styles.why} my-4 py-2 px-3`} style={{ direction: "ltr" }}>
          <Container>
            <Row className="align-items-center">
            <Col className={styles.secondWHY} xs={12} sm={12} md={6} lg={8}>
                <div>
                  <h3 className={`${styles.whyDesc} font-quest fw-bloder`}>
                    Why Aprint is your Best Option ?
                  </h3>
                  <p className="font-roboto ps-4">
                    APrint is a major supplier of promotional banners to local authorities, government departments, and universities, making us the first choice for custom banners. All of our orders are produced as white-label, allowing us to send banners directly to your client. Our white label banner printing is used across multiple industries, such as marketing agencies, graphic designers, event organizers, printers, sign companies, and more. With our Trade Vinyl Banner Printing service, we manufacture high-quality PVC banners at the most competitive prices. Our product range includes custom banners, outdoor banner printing, printed banners and signs, custom banner printing, and trade banner printing. We cater to clients and resellers throughout Spain and Europe.
                  </p>
                  <p className="font-roboto ps-4">Super Wide 5 Metre UV Ink Printers - Print up to 5-metre-wide banners with no joints.</p>
                  <p className="font-roboto ps-4">Looking for a professional design service? - Our in-house design team is capable of exceeding expectations, regardless of whether you are a small business, a popular brand, or an individual commemorating a birthday.</p>
                  <p className="font-roboto ps-4">Signage installation - Maximize the impact of your new large format banner, floor or wall graphic, or brand-new signage with our top-notch professional installation service. Our highly skilled and fully-insured installers will handle all aspects of your project with the utmost care and precision.</p>
                </div>
              </Col>

              <Col xs={12} sm={12} md={6} lg={4} className="position-relative">
                      <div className={`over-flow-hidden pt-2 ps-2 my-2 ${styles.imgContainer} position-relative`} >
                        <div className={styles.imgDiv1}></div>
                        <img src={options[0]?.image} className="w-100 h-100" alt="" />
                      </div>
                      <div className={`over-flow-hidden pt-2 ps-2 my-2 ${styles.imgContainer} position-relative`} >
                        <div className={styles.imgDiv1}></div>
                        <img src={options[3]?.image} className="w-100 h-100" alt="" />
                      </div>
              </Col>
            </Row>
            <div className={` ${styles.afterWhy} d-flex gap-5 justify-content-center`} style={{ marginTop: "100px" }} >
              <div className={styles.whyItem}>
                <div className={styles.img_cont}>
                  <img src={brush} alt="deliveryImage" />
                </div>
                <p className="mt-4 font-quest fs-5 fw-bloder">Design and Print In House</p>
              </div>
              <div className={styles.whyItem}>
                <div className={styles.img_cont}>
                  <img src={checking} alt="deliveryImage" />
                </div>
                <p className="mt-4 font-quest fs-5 fw-bloder">Quality Guaranteed</p>
              </div>
              <div className={styles.whyItem}>
                <div className={styles.img_cont}>
                  <img src={deliveryImage} alt="deliveryImage" />
                </div>
                <p className="mt-4 font-quest fs-5 fw-bloder">Always Here To Help</p>
              </div>
              <div className={`${styles.whyItem}`}>
                <div className={`${styles.img_cont} text-center`}>
                  <img
                    src={payment}
                    alt="deliveryImage "
                    className="text-center"
                  />
                </div>
                <p className="mt-4 text-center fs-5 font-quest fw-bloder">Lowest Trade Prices</p>
              </div>
            </div>
          </Container>
        </section>
        {/* <section
          className={styles.services}
          style={{ transition: "display 1s" }}
        >
          <Container>
            <div
              className={`${styles.services_header} w-100 d-flex align-items-center justify-content-between`}
            >
              <h3 className={`${styles.heading}`}>
                {" "}
                Aprint Services Categories{" "}
              </h3>
              <Link
                to="/services"
                style={{ color: "#3E4F94", marginInlineEnd: "32px" }}
              >
                {" "}
                See All Services
              </Link>
            </div>

            {serviceLoading ? (
              <Loader />
            ) : servicesError ? (
              <p className="text-danger text-center display-4">
                something went wrong
              </p>
            ) : (
              <div className={`row gy-3`}>
                {services.map((item, index) => <div key={index} className="col-md-6 col-lg-4">
                  <Link
                    to={`/services/${item.id}`}
                    className={`${styles.servicesItem} h-100`}
                    style={{
                      cursor: "pointer",
                      color: "black",
                    }}
                  >
                    <ServiceItem service={item} type="homePage" />
                  </Link>
                  </div>
                )}
              </div>
            )}
          </Container>
        </section> */}

        <section className={styles.products}>
          <Container>
            <div className={`${styles.services_header} mb-3 d-flex align-items-center justify-content-between mt-4`} >
              <h3 className={`${styles.heading}`}> Aprint Products Categories </h3>
              <Link to="/products" style={{ color: "#3E4F94", marginInlineEnd: "32px" }} >
                See All Products
              </Link>
            </div>
            {serviceLoading ?  <Loader /> : servicesError ? (  <p className="text-danger text-center display-4">
                something went wrong
              </p>
            ) : (
              <Row>
                {products.map((item, index) => (
                  <Col xs="12"  sm="12" md="6" lg="4" xl="3"  className="p-1 mt-4" key={index} >
                    <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }} className=""  >
                      <div className={styles.productItem}>
                        <img src={item.image} alt={item.name} />
                        <div
                          style={{ border: "1px solid #888", padding: "15px 15px 2px 15px", borderRadius: "0px 0px 15px 15px", }} >
                          <h3 style={{ fontSize: ".95rem", fontWeight: "normal", color: "#374958", }} >
                            {item.name}
                          </h3>
                          <div className="d-flex">
                            <p style={{ color: "#1E96FC" }}>
                              ({item.count}) Products
                            </p>
                            <div className={`d-flex ali-align-items-center ${styles.parentHover} ms-auto`} >
                              <span className={`${styles.gradient2} mt-1`} >
                                Discover Products
                              </span>
                              <span className={`${styles.arrowCont} ${styles.arrowCont2}`} >
                                <MdKeyboardArrowLeft />{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </section>

        <section className={`${styles.download} py-2 rounded`}>
          <div className="container ">
            <div className="row">
            <div className={`${styles.content} col-md-6 mol-lg-7 text-center`}>
              <h3 className="mb-4 text-center">APrint App </h3>
              <p style={{ lineHeight: "2", color: "#D4D5FF", fontSize: ".9rem", }} className="text-justify">
                This text is an example that can be replaced in the same
                space. This text has been generated from This text is an
                example that can be replaced in the same space. This text
                has been generated from This text is an example that can be
                replaced in the same space. This text has been generated
                from
              </p>
              <div>
                <p className="text-white my-3 text-center" >
                  Download Our App
                </p>
                <div className={styles.downloadApp}>
                  <Link to="/">
                    <img className="ms-3"  style={{ width: "25%" }} src={d3} alt="" />
                  </Link>
                  <Link to="/" >
                    <img className="ms-3" style={{ width: "25%" }} src={d2} alt="" />
                  </Link>
                  <Link to="/">
                    <img src={d1} className="ms-3" alt="" style={{ width: "25%" }} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mol-lg-5">
              <img className="w-100" src={AppImage} alt="" />
            </div>
            </div>
          </div>
        </section>

        <section  id="contact_us" className={`my-5 rounded w-100`} style={{ background: "#fff" }} >
          <Container >
            <Row>
              <Col lg="6" xl="6" >
                <div className="my-3">
                  <h4 className="font-quest fw-bold text-center mb-3"style={{color: "#1E96FC"}}>
                    Contact Us Now
                  </h4>
                  <div className={`${styles.form} my-3 `} >
                    <Formik className="w-100" initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                      {(formik) => <Form className="my-2 w-100  text-center">
                            <FormikControl className="inputShadow mx-auto" control="input" type="text" name="fullName"  placeholder="Full Name"   />
                            <FormikControl className="inputShadow mx-auto" control="input" type="email" name="contactEmail" placeholder="Email "  />
                            <FormikControl className="inputShadow mx-auto" control="input" type="phone" name="contactPhone" placeholder="Phone Number" />
                            <FormikControl className="inputShadow mx-auto my-2" control="textarea" rows="5" name="contactMessage" placeholder=" Message"  />
                            <input type="submit" className={` ${ !formik.isValid ? `${styles.disabled}` : "" }  ${styles.main_btn} mx-auto w-25 my-2`} disabled={!formik.isValid} value="Send" />
                          </Form>
                        }
                    </Formik>
                  </div>
                </div>
              </Col>
              <Col lg="6" xl="6" >
                <iframe
                  title="alwan location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.0308315843517!2d-5.353146824678334!3d36.19013200185213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0cc1009d0dd98b%3A0x6fc6ae51b6cb045f!2sC.%20la%20Perdiz%2C%2011300%20El%20Zabal%2C%20C%C3%A1diz%2C%20Spain!5e0!3m2!1sen!2seg!4v1707377020059!5m2!1sen!2seg" 
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Col>
            </Row>
          </Container>
        </section>

        <section className={`${styles.areYou} `}>
          <div className={`${styles.innerAreYou} py-4 px-3`}>
            <h4 className="text-light">NEED OUR HELP ?</h4>
            <p className="text-white font-roboto text-capitalize" >
              As the foremost specialist in banner printing and large-format printing, APrint leads the industry in Spain. We are dedicated to delivering only the highest quality prints using superior materials and inks, utilising advanced printing technology and a team of highly skilled professionals. We strive to offer an unparalleled experience for our customers with easy and swift ordering, dependable print outcomes, and exceptional value pricing. Trust us to deliver excellence from beginning to end.
            </p>
            <p
              className="text-white"
              style={{ width: "52%", lineHeight: "1.9" }}
            >
              Contact us and we will do what you want as soon as possible
            </p>
            <div
              className={`${styles.btnsCintainerAre}w-50`}
              style={{
                margin: "0px auto 0px",
                position: "relative",
                zIndex: "2",
                marginTop: "2rem",
              }}
            >
              <Link className={`${styles.btn1}`} to="/">
                Contact Us
              </Link>
              <Link className={`${styles.btn2}`} to="/">
                <span style={{ marginInlineEnd: ".5rem" }}>
                  <FaWhatsapp />
                </span>
                <span>Whats App</span>
              </Link>
            </div>
            <img className={`${styles.elipse}`} src={elipse1} alt="" />
          </div>
        </section>
      </div>
      <div>
        <SwiperCards Brands={Brands} />
        <ClientsSwiper Clients={Clients} />
      </div>
    </Helmet>
  );
};

export default Home;
