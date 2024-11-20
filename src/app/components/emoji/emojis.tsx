import React from "react";
import Image from "next/image";
import styles from "./emojis.module.css";

export const images = new Array(25)
  .fill(0)
  .map((_, k) => () => (
    <Image
      src={`/emojis/${k + 1}.${k >= 17 ? "svg" : "png"}`}
      alt="illustration of an alien"
      unoptimized
      className={styles.emoji}
      width={50}
      height={50}
    />
  ));
