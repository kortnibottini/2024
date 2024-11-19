"use client";
import React from "react";
import cx from "classnames";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { gsap } from "gsap";
import { uniqueId } from "lodash";

import { images } from "./emoji/emojis";
import { Marquee } from "./marquee";
import { Header } from "../header";
import { Pointer } from "./helpers/pointer";
import styles from "./landing.module.css";

import {
  throttle,
  shuffle,
  calculateDiagonalAngle,
  useMobile,
} from "./helpers/utils";

gsap.registerPlugin(ScrollToPlugin);

type EmojiSpot = {
  x: number;
  y: number;
  src: () => React.JSX.Element;
  uid: string;
};

let shuffledImages = shuffle(images);

const action = throttle((x, y, setActiveMojis, activeMojis) => {
  const uid = uniqueId();
  if (shuffledImages.length <= 0) {
    shuffledImages = shuffle(images);
  }
  const newMoji = shuffledImages.pop();
  setActiveMojis([...activeMojis, { x, y, src: newMoji, uid }]);
}, 100);

export const Landing = () => {
  const container = React.useRef<HTMLDivElement>(null);
  const tl = React.useRef<any>();
  const animatedStart = React.useRef<{ [key: string]: boolean }>({});
  const [activeMojis, setActiveMojis] = React.useState<Array<EmojiSpot>>([]);
  const [removal, setRemoval] = React.useState<string>();
  const [textAngle, setTextAngle] = React.useState(26);
  const hathMouseMoven = React.useRef(false);
  const [shouldMoveOn, setShouldMoveOn] = React.useState(false);
  const [triggerScroll, setTriggerScroll] = React.useState(false);
  const isMobile = useMobile();

  useGSAP(
    () => {
      if (activeMojis.length > 0) {
        const uid = (activeMojis[activeMojis.length - 1] || {}).uid;
        if (!animatedStart.current[uid]) {
          const genie = `.emoji-${uid}`;
          animatedStart.current = { ...animatedStart.current, [uid]: true };
          tl.current = gsap
            .timeline()
            .fromTo(
              genie,
              { scale: 0, rotation: 0 },
              { scale: 1, ease: "power2.inOut", rotation: 360, duration: 1.1 }
            )
            .to(genie, {
              rotation: 0,
              ease: "power1.inOut",
              duration: 2,
              delay: 0,
              y: "120vh",
              onComplete: () => {
                setRemoval(uid);
              },
            });
        }
      }

      if (shouldMoveOn && window.scrollY <= 10) {
        const elm = document.getElementById("intro");
        const offset =
          elm?.offsetTop! + elm?.offsetHeight! - window.innerHeight;

        gsap.to(window, {
          duration: 2,
          scrollTo: {
            y: offset,
          },
          onComplete: () => {
            setShouldMoveOn(false);
          },
        });
      }
    },
    {
      scope: container,
      dependencies: [activeMojis, shouldMoveOn],
      revertOnUpdate: false,
    }
  );

  React.useEffect(() => {
    const emojiOffScreen = activeMojis.filter(({ uid }) => {
      return uid !== removal;
    });

    setActiveMojis(emojiOffScreen);

    /** We specifically only want to react to a new removal being queued */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removal]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    hathMouseMoven.current = true;

    action(clientX, clientY, setActiveMojis, activeMojis);
  };

  React.useEffect(() => {
    setTextAngle(calculateDiagonalAngle());
    setTimeout(() => {
      if (!hathMouseMoven.current && !shouldMoveOn && !isMobile) {
        setShouldMoveOn(true);
      }
    }, 10000);

    setTimeout(() => {
      setTriggerScroll(true);
    }, 5000);
  }, []);

  return (
    <div
      className={cx(styles.container, "sticky-section")}
      ref={container}
      onMouseMove={handleMouseMove}
    >
      <Header />
      <Marquee
        className={styles.marquee}
        style={{ "--text-angle": textAngle } as React.CSSProperties}
      >
        <span>
          <Image
            unoptimized
            src="/kbdd.svg"
            alt="Kortni bottini does design"
            height={137}
            width={137}
            priority
          />
        </span>
        <span>
          <Image
            unoptimized
            src="/kbdd.svg"
            alt="Kortni bottini does design"
            height={137}
            width={137}
            priority
          />
        </span>
      </Marquee>
      {triggerScroll && <Pointer />}
      {activeMojis.map((emoji, k) => {
        const Emoji = emoji ? emoji.src : null;
        return Emoji ? (
          <div
            className={`emoji-${emoji.uid}`}
            key={`moji-${emoji.uid}`}
            style={{ position: "fixed", scale: 0, top: emoji.y, left: emoji.x }}
          >
            <Emoji key={`emoji-${emoji.uid}`} />
          </div>
        ) : null;
      })}
    </div>
  );
};
