import * as React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useMobile } from "./components/helpers/utils";
import { Toast } from "./components/helpers/toast";
import LilArrow from "../../public/lil-arrow.svg";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  useGSAP(() => {
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `#intro`,
        start: "top 70%",
        end: "bottom bottom",
        pin: false,
        scrub: 1,
        markers: false,
      },
    });

    timeline.from(`.${styles.footer}`, {
      yPercent: -5,
      opacity: 0,
      duration: 2,
      stagger: 0.5,
    });
  }, []);
  const isMobile = useMobile();

  const [showToast, setShowToast] = React.useState(false);

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (document) {
      const txt = e.currentTarget.getAttribute("href");
      navigator.clipboard.writeText(txt!).then(() => {
        setShowToast(true);
      });
    }
  };

  const hideToast = () => {
    setShowToast(false);
  };

  return (
    <footer className={styles.footer}>
      {showToast && <Toast cb={hideToast}>Email copied!</Toast>}
      <div>
        <a href="hey@kortnibottini.com" onClick={copyLink}>
          {isMobile ? "E" : "copy: hey@kortnibottini.com"}
        </a>
      </div>
      <div className={styles.footerMiddle}>
        <a href="phone:503.816.2299"># {isMobile ? "P" : "503.816.2299"}</a>
      </div>
      <div className={styles.footerRight}>
        <a href="https://www.linkedin.com/in/kortni-bottini/">
          <Image src={LilArrow} alt="tiny arrow pointing to Linkedin" />{" "}
          {isMobile ? "L" : "Linkedin"}
        </a>
      </div>
    </footer>
  );
};