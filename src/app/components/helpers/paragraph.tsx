import * as React from "react";
import cx from "classnames";
import stylez from "./paragraph.module.css";

export const Paragraph: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ children, className, ...rest }) => {
  return (
    <p className={cx(stylez.paragraph, className)} {...rest}>
      {children}
    </p>
  );
};
