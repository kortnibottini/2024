import * as React from "react";
import cx from "classnames";
import styles from "./heading.module.css";

export const Heading: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { as?: "h1" | "h2" }
> = ({ children, className, as = "h2", ...rest }) => {
  const Tag = as;
  return (
    <Tag className={cx(styles.heading, className)} {...rest}>
      {children}
    </Tag>
  );
};
