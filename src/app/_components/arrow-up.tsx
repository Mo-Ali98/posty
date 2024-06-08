"use client";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "./button";


export default function ArrowUpBtn() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    //Button should only appear after scrolling half the window
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showButton) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-4 right-4 z-10"
      >
        <Button
          className="inline-flex items-center justify-center rounded-full"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <ArrowUpIcon className="h-5 w-5" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
