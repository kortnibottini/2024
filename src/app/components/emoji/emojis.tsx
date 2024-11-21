import React from "react";
import Image from "next/image";
import styles from "./emojis.module.css";

export const images = new Array(25)
  .fill(0)
  .map((_, k) => () => (
    <Image
      src={`/emojis/${k + 1}.${k >= 20 ? "svg" : "png"}`}
      alt="a randomized emoji rotating and going off screen"
      unoptimized
      className={styles.emoji}
      width={50}
      height={50}
    />
  ));
