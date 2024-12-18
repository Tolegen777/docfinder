import React from "react";
import "./Footer.scss";
import Image from "next/image";
import logo from "../../components/svg/FooterIcon.svg";
import Link from "next/link";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__content__left">
            <Image
              src={logo}
              width={336}
              height={70}
              alt=""
            />
            <div>
              <h1>Врачи которым вы доверяете</h1>
              <h2>Средний стаж от 15 лет</h2>
              <p>
                Наша команда – это высококвалифицированные специалисты с
                проверенным опытом. Мы гордимся тем, что наши врачи имеют
                средний стаж работы более 7 лет, что гарантирует вам лучшее
                медицинское обслуживание.
              </p>
            </div>
          </div>
          <div className="footer__content__right">
            <nav>
              <Link href={"/"}>Врачи</Link>
              <Link href={"/"}>Процедуры</Link>
              <Link href={"/"}>Клиники</Link>
            </nav>
            <div className={'footer__phone'}>
              <p>Контакты:</p>
              <p id={'footerPhone'} style={{marginLeft: '-10px'}}>8700 999 0103</p>
            </div>
            {/*<div>*/}
            {/*  <input*/}
            {/*    type="text"*/}
            {/*    placeholder="Врачи, Услуги, Клиники"*/}
            {/*    name=""*/}
            {/*    id=""*/}
            {/*  />*/}
            {/*  <button>Найти</button>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
