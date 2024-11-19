import * as React from "react";
import styles from "./intro.module.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { CustomEase } from "gsap/all";
import { useMobile } from "../helpers/utils";

import cx from "classnames";
import { MobileIntro } from "./mobile";
import { DesktopIntro } from "./desktop";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const AnimateLine: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <span className={styles["animate-line"]} {...rest}>
      {children}
    </span>
  );
};

export const Intro = () => {
  const isMobile = useMobile();
  useGSAP(
    () => {
      CustomEase.create("custom", "0.64, 0.03, 0.07, 0.97");
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

      timeline
        .add("start")
        .from(
          `.${styles.intro} .animate-in`,
          {
            yPercent: -5,
            opacity: 0,
            duration: 2,
            ease: "custom",
            stagger: 0.5,
          },
          "start"
        )
        .from(
          `.${styles.intro} .${styles["animate-line"]}`,
          {
            clipPath: "inset(100% 0 0 0)",
            duration: isMobile ? 1 : 1.5,
            delay: isMobile ? 0 : 1,
            ease: "custom",
            stagger: 0.2,
            reversed: true,
          },
          "start"
        );
    },
    { dependencies: [] }
  );

  return (
    <section className={cx(styles.intro, "sticky-section")} id="intro">
      {isMobile ? <MobileIntro /> : <DesktopIntro />}
    </section>
  );
};
