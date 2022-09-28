import React from 'react';
import logo from './../images/image-logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  
  function onHeaderLinkClick() {
    props.onHeaderLinkClick(props.link);
  }

  return (
    <header className="header">
      <a href="https://salatsr.github.io/react-mesto-auth/"
        className="header__logo-link">
        <img src={logo}
          alt="Логотип Mestro Russia"
          className="header__logo" />
      </a>
      <div className="header__wrapper">
        <p className="header__user-info">{props.userEmail}</p>
        <Link
          to={`${props.link}`}
          className="header__entrance-link"
          type="button"
          onClick={onHeaderLinkClick}
        >
          {props.btnText}
        </Link>
      </div>
    </header>
  );
}

export default Header;