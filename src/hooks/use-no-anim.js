import { useEffect, useState } from "react";

// this hook prevents image animation (scale image up) from running when page loads
const useNoAnim = () => {
  const [noAnim, setnoAnim] = useState(true);

  // whent page load, set anim duration  of img to 0s
  // after 1s from page load, set animation duration to normal duration
  useEffect(() => {
    setTimeout(() => {
      setnoAnim(false);
    }, 1000);
  }, []);

  return noAnim;
};

export default useNoAnim;
