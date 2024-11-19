"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import styles from "./page.module.css";
import { Landing } from "./components/landing";
import { Intro } from "./components/intro/index";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";
import { Footer } from "./footer";
import { Separation } from "./components/separation";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const lenisRef = useRef<any>(null);
  useGSAP(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        touchInertiaMultiplier: 2,
      }}
    >
      <main className={styles.main}>
        <div className={styles.description}>
          <Landing />
          <div>
            <Intro />
            <Separation />
            <Projects />
            <Separation />
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </ReactLenis>
  );
}
