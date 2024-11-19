import * as React from "react";
import styles from "./em.module.css";

export const Em: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <span className={styles.em} {...rest}>
      {children}
    </span>
  );
};
