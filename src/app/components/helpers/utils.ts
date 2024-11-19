import { useMediaQuery } from "@react-hookz/web";

export const useMobile = () => {
  return useMediaQuery("screen and (max-width: 1024px)");
};

export const shuffle = (array: Array<any>) => {
  const rr = [...array];
  let length = rr.length,
    t,
    i;

  while (length) {
    // pick a random index from the remaining pool
    i = Math.floor(Math.random() * length--);

    // Temporarily store element to swap
    t = rr[length];
    rr[length] = rr[i];
    rr[i] = t;
  }

  return rr;
};

export const throttle = (fn: (...args: any) => void, time: number) => {
  let interval: any = null;
  return (...args: any) => {
    if (interval === null) {
      fn(...args);
      interval = setTimeout(() => {
        interval = null;
      }, time);
    }
  };
};

export const calculateDiagonalAngle = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const angleRadians = Math.atan(height / width); // Angle in radians
  const angleDegrees = angleRadians * (180 / Math.PI); // Convert to degrees
  return angleDegrees;
};