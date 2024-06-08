"use client";

import { useState, useEffect } from "react";

export default function ScrollBarProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 h-2 w-full bg-white">
      <div
        className="h-full bg-[hsl(280,100%,70%)] transition-all duration-500"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
