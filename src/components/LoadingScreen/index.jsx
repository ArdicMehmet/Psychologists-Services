"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import "./styles.css";

export default function LoadingScreen() {
  const [loadingText, setLoadingText] = useState("Yükleniyor");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((current) => {
        if (current === "Yükleniyor...") return "Yükleniyor";
        return current + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="loading-container"
      >
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          className="loading-icon"
        >
          <Loader2 size={64} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="loading-text"
        >
          {loadingText}
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="loading-progress"
        />
      </motion.div>
    </div>
  );
}
