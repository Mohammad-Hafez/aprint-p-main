import React from "react";
import { Container } from "react-bootstrap";
import styles from "../styles/footer/footer.module.css";
import logo from "../assets/images/download/Group 64.png";
import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { CiInstagram } from "react-icons/ci";
const Footer = () => {
  return (
    <section className={`${styles.footer}`}>
      <Container>
        <div className={`row mt-2`}>
          <div className={`${styles.class1}  col-md-6 `}>
            <div className={`d-flex align-items-center  ${styles.FooterfristDiv}`} >
              <img className={`${styles.imgLogo}`} src={logo} alt="" />
              <div className="ms-2">
                <h5>Aprint Limited Liability Company</h5>
                <p style={{ fontSize: ".6rem" }}>
                  Aprint Limited Liability Company
                </p>
              </div>
            </div>
            <p className={styles.Footerinfo}  style={{ fontSize: ".8rem",  marginTop: "10px", color: "#B6B7CD", }}  >
              APrint trading Name of MEGAIMPRESIONES DEL SUR S.L
            </p>
            <h5 className="fw-bolder font-quest">
                    Spain
            </h5>
            <p className="font-roboto">
              C. la Perdiz, 28, 11300 La Línea de la Concepción, Cádiz, España
            </p>
          </div>
          <div className="footerContact  col-md-3 text-light">
            <p className="font-roboto">Tel : +34 856 6211 42</p>
            <p className="font-roboto">General : <Link className="text-light" to="mailto:hello1@example.com">hello@aprint.com</Link> </p>
            <p className="font-roboto">Returns : <Link className="text-light" to="mailto:returns@aprint.com">returns@aprint.com</Link></p>
            <p className="font-roboto">Sales :   <Link className="text-light" to="mailto:sales@aprint.com">sales@aprint.com</Link></p>
            <p className="font-roboto">Support  : <Link className="text-light" to="mailto:support@aprint.com">support@aprint.com</Link></p>
            <div className={styles.last} >
              <div className={` ${styles.linksContainer}`}>
                <h6 style={{ fontSize: ".9rem" }}> Find Us :</h6>
                <Link to="/" className="me-1">
                  <IoLogoLinkedin />
                </Link>
                <Link to="/" className="mx-1">
                  <FaFacebookSquare />
                </Link>
                <Link to="/" className="mx-1">
                  <BsTwitter />
                </Link>
                <Link to="/" className="mx-1">
                  <CiInstagram />
                </Link>
              </div>
          </div>

          </div>
          <div className="col-md-3 footerLinks d-flex justify-content-between  flex-grow-1 px-3">
        <div className={`${styles.middle} `} >
              <h4 className="mb-0">Home</h4>
              <ul style={{ listStyle: "none" }} >
                <li>
                  <Link to="/">Products</Link>
                </li>
                <li>
                  <Link to="/"> Contact Us</Link>
                </li>
                <li>
                  <Link to="/">Aprint App</Link>
                </li>
              </ul>
          <div>
            </div>
          </div>

        </div>

        </div>
        <div className={`${styles.hr}`} />
        <div className={`${styles.footerContainer2} `}>
          <ul className="d-flex justify-content-between mt-3 p-0" style={{ listStyle: "none"}} >
            <li className="me-3">
              <Link className={`${styles.lastLink}`} to="/Terms">
                Terms and Conditions
              </Link>
            </li>
            <li className="mx-3">
              <Link className={`${styles.lastLink}`} to="/PrivacyPolicy">
                Privacy Policy
              </Link>
            </li>
            <li className="mx-2">
              <Link className={`${styles.lastLink}`} to="/ShippingPolicy">
                Shipping Policy
              </Link>
            </li>
          </ul>
          <div  className="mt-3" >
            <p style={{ fontSize: ".75rem"}}>
              <span className="fw-bolder">Aprint</span> All rights reserved 2024
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
