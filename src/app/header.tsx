import * as React from "react";
import cx from "classnames";
import styles from "./header.module.css";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const TextInfo: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <span className={styles.textBlurb}>{children}</span>
);

export const Header = () => {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();

    gsap.to(window, {
      duration: 1,
      scrollTo: "#contact",
    });
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Image
          src="/logo.svg"
          alt="Logo for Kortni Bottini"
          priority
          height="40"
          width="40"
          className="inverter"
        />
        <div className={styles.textInfo}>
          <TextInfo>
            <b>currently:</b> @yahoo{" "}
          </TextInfo>
          <TextInfo>
            <b>previously:</b> @cashapp
          </TextInfo>
          <TextInfo>
            <span className={styles.emoji}>🌎&nbsp;&nbsp;</span>
            <b>located:</b> portland, or
          </TextInfo>
          <TextInfo>
            <b>cusp</b> libra/scorpio
            <span className={styles.emoji}>&nbsp;&nbsp;🔮</span>
          </TextInfo>
        </div>
        <nav className={cx(styles.navigation)}>
          <a
            href="https://www.linkedin.com/in/kortni-bottini"
            target="_blank"
            className={cx(styles.headerButton, styles.resume)}
          >
            resumé
          </a>
          <a
            href="#contact"
            className={cx(styles.headerButton, styles.contact)}
            onClick={handleContactClick}
          >
            contact
          </a>
        </nav>
      </div>
    </header>
  );
};
