import styles from "./intro.module.css";

export const AnimateLine: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <span className={styles["animate-line"]} {...rest}>
      {children}
    </span>
  );
};
