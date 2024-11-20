import * as React from "react";
import styles from "./intro.module.css";
import Circle from "../../../../public/name-circle.svg";
import CircleArrow from "../../../../public/long-point.svg";
import { Em } from "../helpers/em";
import { Heading } from "../helpers/heading";
import { Paragraph } from "../helpers/paragraph";
import { AnimateLine } from "./animate-line";
import Image from "next/image";
import cx from "classnames";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";

export const DesktopIntro = () => {
  const tl = React.useRef<gsap.core.Timeline>();
  useLenis(({ velocity }) => {
    tl.current?.timeScale(velocity * 0.025 || 1);
  });
  useGSAP(
    () => {
      tl.current = gsap.timeline({});
      tl.current.to(`.name-brand-circle`, {
        rotation: 360,
        duration: 5,
        ease: "linear",
        repeat: -1,
      });
      tl.current.play();
    },
    {
      dependencies: [],
      revertOnUpdate: false,
    }
  );

  return (
    <div className={styles.introInner}>
      <div className={cx(styles.heading, "animate-in")}>
        <AnimateLine>
          <Heading as="h1" className={styles.title}>
            Hi there, I&apos;m <Em id="kb">Kortni</Em>.
          </Heading>
        </AnimateLine>
        <Heading className={styles.title}>
          <AnimateLine>Director of Product</AnimateLine>
          <AnimateLine>
            Design <Em>leading</Em>
          </AnimateLine>
          <AnimateLine>
            <Em> the future</Em> of
          </AnimateLine>
          <AnimateLine>communication</AnimateLine>
          <AnimateLine>
            <Em> @yahoo</Em>
          </AnimateLine>
        </Heading>
      </div>
      <div className={cx(styles.image, "animate-in")}>
        <div className={cx(styles.circleContainer, "animate-in")}>
          <div className={styles.circleInner}>
            <Image
              src={Circle}
              priority
              alt="name circle"
              className="name-brand-circle"
            />
            <Image
              src={CircleArrow}
              alt="Design element arrow"
              className={styles.arrowPoint}
            />
          </div>
        </div>
        <Image
          src={"/headshot.png"}
          alt="Image of kortni bottini"
          height={476}
          width={408}
        />
      </div>
      <div className={cx(styles.story, "animate-in")}>
        <Paragraph>
          With 15 years of experience making design magic happen, I lead with a
          focus on crafting unforgettable experiences that blend strategy and
          creativity.
        </Paragraph>
        <Paragraph>
          Passionate about building exceptional design cultures, I thrive on
          turning bold ideas into impactful realities.
        </Paragraph>
      </div>
    </div>
  );
};
