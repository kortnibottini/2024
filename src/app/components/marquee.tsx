import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { horizontalLoop } from "./helpers/horizontalScroll";
import { useLenis } from "lenis/react";
import styles from "./marquee.module.css";
import cx from "classnames";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  paused?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className,
  speed = 5,
  paused = false,
  ...rest
}) => {
  const tl = React.useRef<gsap.core.Timeline>();
  const hasPageLoaded = React.useRef(false);

  React.useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {
      hasPageLoaded.current = true;
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);

      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  useLenis(({ velocity }) => {
    tl.current?.timeScale(hasPageLoaded.current ? velocity || 1 : 1);
  });
  useGSAP(() => {
    tl.current = horizontalLoop(
      gsap.utils.toArray(`.${className} span`),
      {
        paused: false,
        repeat: -1,
        speed,
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
