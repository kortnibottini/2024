import * as React from "react";
import styles from "./contact.module.css";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { CustomEase } from "gsap/all";
import Marquee1 from "../../../public/marquee-1.svg";
import Marquee2 from "../../../public/marquee-2.svg";
import { Marquee } from "./marquee";
import cx from "classnames";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const NMQ: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <span className={styles.nm}>{children}</span>
);

const Tan: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => <span className={cx(styles.tan, className)}>{children}</span>;

export const Contact = () => {
  useGSAP(() => {
    CustomEase.create("custom", "0.64, 0.03, 0.07, 0.97");
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `#contact`,
        start: "top 70%",
        end: "bottom bottom",
        pin: false,
        scrub: 1,
        markers: false,
      },
    });
  }, []);
  const [result, setResult] = React.useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "9b9514bb-81a4-400e-977b-ddfb51c15196");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <section className={cx(styles.contact, "sticky-section")} id="contact">
      <Marquee speed={2} className={styles.contactMarquee}>
        <NMQ>&nbsp;&nbsp;&nbsp;GET</NMQ>
        <NMQ>IN</NMQ>
        <NMQ>TOUCH</NMQ>
        <Tan className={styles.marqueeStartEmoji}>
          <Image src={Marquee1} priority alt="Smiley face" />
        </Tan>
        <Tan>GET</Tan>
        <Tan>IN</Tan>
        <Tan>TOUCH</Tan>
        <Tan className={styles.marqueeEndEmoji}>
          <Image src={Marquee2} alt="Smiley face" />
        </Tan>
        <NMQ>GET</NMQ>
        <NMQ>IN</NMQ>
        <NMQ>TOUCH</NMQ>
        <Tan className={styles.marqueeStartEmoji}>
          <Image src={Marquee1} priority alt="Smiley face" />
        </Tan>
        <Tan>GET</Tan>
        <Tan>IN</Tan>
        <Tan>TOUCH</Tan>
        <Tan className={styles.marqueeEndEmoji}>
          <Image src={Marquee2} alt="Smiley face" />
        </Tan>
      </Marquee>
      <div className={styles.contactInner}>
        <form onSubmit={onSubmit}>
          <input type="hidden" name="subject" value="Inquiry from your site" />
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" required placeholder="Message"></textarea>

          <button type="submit">Submit Form</button>
        </form>
      </div>
    </section>
  );
};
