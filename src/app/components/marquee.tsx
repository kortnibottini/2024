import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { horizontalLoop } from "./helpers/horizontalScroll";
import { useLenis } from "lenis/react";
import styles from "./marquee.module.css";
import cx from "classnames";

export const Marquee: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  const tl = React.useRef<gsap.core.Timeline>();
  useLenis(({ velocity }) => {
    tl.current?.timeScale(velocity || 1);
  });
  useGSAP(() => {
    tl.current = horizontalLoop(
      gsap.utils.toArray(`.${className} span`),
      {
        paused: false,
        repeat: -1,
        speed: 5,
      },
      gsap
    );
    tl.current!.play();
  });

  return (
    <div className={cx("marquee", styles.marquee, className)} {...rest}>
      {children}
    </div>
  );
};
