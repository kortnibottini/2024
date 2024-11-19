import * as React from "react";
import cx from "classnames";
import styles from "./intro.module.css";
import { AnimateLine } from "./animate-line";
import { Heading } from "../helpers/heading";
import { Paragraph } from "../helpers/paragraph";
import { Em } from "../helpers/em";
import Image from "next/image";

export const MobileIntro = () => {
  return (
    <div className={cx(styles.mobileContainer)}>
      <div className={cx(styles.image, "animate-in")}>
        <Image
          src={"/headshot.png"}
          alt="Image of kortni bottini"
          height={476}
          width={408}
        />
      </div>
      <div className={styles.mobileTextContent}>
        <div className={cx(styles.heading, "animate-in")}>
          <Heading as="h1" className={styles.title}>
            <AnimateLine>
              Hi there, I&apos;m <Em id="kb">Kortni</Em>. Director of Product
              Design <Em>leading the future</Em> of communication{" "}
              <Em>@yahoo</Em>
            </AnimateLine>
          </Heading>
        </div>
        <div className={cx(styles.story, "animate-in")}>
          <Paragraph>
            With 15 years of experience making design magic happen, I lead with
            a focus on crafting unforgettable experiences that blend strategy
            and creativity.
          </Paragraph>
          <Paragraph>
            Passionate about building exceptional design cultures, I thrive on
            turning bold ideas into impactful realities.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
