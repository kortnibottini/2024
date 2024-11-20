import * as React from "react";
import styles from "./projects.module.css";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { CustomEase } from "gsap/all";
import { Em } from "./helpers/em";
import { Heading } from "./helpers/heading";
import { Paragraph } from "./helpers/paragraph";

import project1 from "../../../public/projects/1.png";
import project2 from "../../../public/projects/2.png";
import project3 from "../../../public/projects/3.png";
import project4 from "../../../public/projects/4.png";
import project5 from "../../../public/projects/5.png";

const projects = [project1, project2, project3, project4, project5];

import cx from "classnames";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

export const Projects = () => {
  useGSAP(
    () => {
      const projectImages = document.querySelectorAll(
        `.${styles.projectItems} img`
      );
      const randomRotations = Array.from(projectImages).map(() =>
        gsap.utils.random(-65, 65)
      );

      CustomEase.create("custom", "0.64, 0.03, 0.07, 0.97");
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `#projects`,
          start: "top top",
          pin: true,
          scrub: true,
          end: "+=" + window.innerHeight * projects.length,
          markers: false,
        },
      });

      timeline.add("start").fromTo(
        projectImages,
        { rotate: (index) => randomRotations[index] },
        {
          rotate: 360,
          duration: projects.length,
          y: "-100vh",
          ease: "custom",
          stagger: 2,
          reversed: true,
        },
        "start"
      );
    },
    {
      revertOnUpdate: false,
      dependencies: [],
    }
  );
  return (
    <section className={cx(styles.projects, "sticky-section")} id="projects">
      <div className={styles.projectsInner}>
        <Heading className="animate-in">
          Human <Em>first</Em> leader.
        </Heading>
        <Heading>
          <Em>AI enthusiast</Em>. Full-time <Em>creative</Em>.
        </Heading>
        <Paragraph className={cx(styles.story, "animate-in")}>
          When I am not championing strategic teams, you can find me in my
          backyard urban farm or climbing a mountain. I am a pretty baller cook,
          I love hip hop, and could talk for hours on the finer points of b-roll
          horror films. I like to collaborate with amazing talent, solve tricky
          problems, and make the world a better place one interaction at a time.
          Design is about the human experience—people first, always.
        </Paragraph>
        <div className={styles.projectItems}>
          {projects.map((src, i) => (
            <Image
              src={src}
              key={`${i}-project`}
              alt="Screenshot of product design"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
