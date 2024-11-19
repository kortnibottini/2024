import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import styles from "./toast.module.css";

const trgt = `.${styles.toast}`;

export const Toast: React.FC<React.PropsWithChildren<{ cb: () => void }>> = ({
  children,
  cb,
}) => {
  useGSAP(() => {
    gsap
      .timeline()
      .to(trgt, {
        y: -60,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(trgt, {
        delay: 2,
        y: 60,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          cb();
        },
      });
  });

  return <div className={styles.toast}>{children}</div>;
};
