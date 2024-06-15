"use client";
import React, { useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import logo from "@/components/svg/logo.svg";
import Image from "next/image";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import arrowdrop from "@/components/svg/dropdownarrow.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";

function Header() {
  const [isopen, setisopen] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.rigthside}>
              <Link href="/" className={styles.logo}>
                <Image src={logo} alt="" />
              </Link>
              <RxHamburgerMenu
                size={25}
                className={styles.burgermenu}
                onClick={() => setisopen(true)}
              />
              <input
                className={styles.headerInut}
                placeholder="Врачи, Услуги, Клиники"
              />
              <button className={styles.btn}>найти</button>
              <div
                className={
                  isopen
                    ? styles.headerBurgermenu
                    : styles.headerBurgermenuclose
                }
              >
                <input
                  className={styles.BurgermenuInut}
                  placeholder="Врачи, Услуги, Клиники"
                />
                <button className={styles.Burgermenubtn}>найти</button>
                <MdClose size={28} onClick={() => setisopen(false)} />
              </div>
            </div>
            <div className={styles.leftside}>
              <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <Button className={styles.leftsidedrop}>
                  Алмата <Image src={arrowdrop} alt="" />
                </Button>
              </Dropdown>
              <button className={styles.leftsidebtn}>Войти</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
