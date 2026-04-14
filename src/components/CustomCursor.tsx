import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Don't render on mobile devices
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[999999] mix-blend-screen"
        animate={{
          x: x - 8,
          y: y - 8,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-[999998] backdrop-blur-[2px] transition-colors duration-300 ${isHovering ? 'bg-primary/20' : 'bg-transparent'}`}
        animate={{
          x: x - 20,
          y: y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
