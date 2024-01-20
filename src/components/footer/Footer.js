import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-section">
      <p>This web app is made only for educational purposes!!</p>
      <p>
        &copy; 2023 created by ✌
        <a href="https://onam.netlify.app/" rel="noreferrer" target="_blank">
          {" "}
          onamkrverma
        </a>
      </p>
    </div>
  );
};

export default Footer;
