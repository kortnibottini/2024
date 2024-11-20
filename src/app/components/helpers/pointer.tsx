import * as React from "react";
import { Paragraph } from "./paragraph";
import Image from "next/image";
import styles from "./pointer.module.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const Pointer = () => {
  useGSAP(
    () => {
      gsap.to(`.${styles.pointerImg}`, {
        y: 5,
        repeat: -1,
        yoyo: true,
      });
    },
    {
      dependencies: [],
    }
  );

  const handleClick = () => {
    const elm = document.getElementById("intro");
    const offset = elm?.offsetTop! + elm?.offsetHeight! - window.innerHeight;

    gsap.to(window, {
      duration: 2,
      scrollTo: {
        y: offset,
      },
    });
  };

  return (
    <Paragraph className={styles.pointer} onClick={handleClick}>
      This way{" "}
      <Image
        src={"/pointer.svg"}
        width="8"
        height="22"
        alt="pointer arrow"
        className={styles.pointerImg}
      />
    </Paragraph>
  );
};
