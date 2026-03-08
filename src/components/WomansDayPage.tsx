import React from "react";
import { motion } from "framer-motion";

const WomensDayPage = () => {
  const particles = Array.from({ length: 15 });

  const particleVariants = {
    animate: () => ({
      y: [0, -40, 0],
      x: [0, Math.random() * 30 - 15, 0],
      opacity: [0.1, 0.4, 0.1],
      transition: {
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.8, delayChildren: 0.5 },
    },
  };

  const stemVariants = {
    hidden: { pathLength: 0, scaleY: 0.8, originY: "100%" },
    visible: {
      pathLength: 1,
      scaleY: 1,
      transition: {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        pathLength: { duration: 2.2, delay: 0.2 },
      },
    },
  };

  const leafVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 1.5, type: "spring" },
    },
  };

  const bloomContainerVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 2.5,
        duration: 1,
        type: "spring",
        staggerChildren: 0.15,
      },
    },
  };

  const petalVariants = {
    hidden: { opacity: 0, scale: 0.3, originY: "100%" },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    }),
  };

  const heartPulseVariants = {
    animate: {
      scale: [1, 1.15, 1],
      transition: {
        delay: 5,
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1.2 } },
  };

  const styles = {
    outer: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // Centers the whole block vertically
      overflow: "hidden",
      position: "relative",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      background:
        "radial-gradient(circle at center, #fffbf2 0%, #ffeaf1 60%, #ffe0ea 100%)",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    textContainer: {
      textAlign: "center",
      color: "#880e4f",
      marginBottom: "20px", // Space between text and flower
    },
    h1: {
      fontSize: "2.5rem",
      margin: "0 0 10px 0",
      fontWeight: "600",
      whiteSpace: "nowrap",
    },
    p: {
      fontSize: "1.1rem",
      margin: "0 auto",
      maxWidth: "400px",
      lineHeight: "1.4",
      opacity: 0.8,
    },
    canvas: {
      width: "350px",
      height: "350px",
    },
    particle: {
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: "#f48fb1",
      pointerEvents: "none",
    },
  };

  return (
    <div style={styles.outer}>
      {/* Background Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          style={{
            ...styles.particle,
            width: `${5 + Math.random() * 10}px`,
            height: `${5 + Math.random() * 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          variants={particleVariants}
          animate="animate"
        />
      ))}

      <motion.div
        style={styles.contentWrapper}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* TEXT ON TOP */}
        <motion.div style={styles.textContainer} variants={titleVariants}>
          <h1 style={styles.h1}>Boldog Nőnapot Kívánok Szívem </h1>
          <p style={styles.p}>
            Köszönöm hogy vagy nekem és szebbé teszed az életem ❤️
          </p>
        </motion.div>

        {/* FLOWER BELOW TEXT */}
        <div style={styles.canvas}>
          <svg viewBox="0 0 200 250" style={{ width: "100%", height: "100%" }}>
            <motion.path
              d="M100 230 Q95 180 100 110"
              stroke="#66bb6a"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="transparent"
              variants={stemVariants}
            />
            <motion.path
              d="M98 200 C80 195 70 180 85 160"
              stroke="#66bb6a"
              strokeWidth="2"
              fill="#a5d6a7"
              variants={leafVariants}
            />
            <motion.path
              d="M102 180 C120 175 130 160 115 140"
              stroke="#66bb6a"
              strokeWidth="2"
              fill="#a5d6a7"
              variants={leafVariants}
            />
            <motion.g
              variants={bloomContainerVariants}
              style={{ transformOrigin: "100px 110px" }}
            >
              <motion.path
                d="M100 95 C97 92 92 92 92 97 C92 102 100 107 100 107 C100 107 108 102 108 97 C108 92 103 92 100 95"
                fill="#ec407a"
                variants={heartPulseVariants}
                animate="animate"
              />
              <motion.g custom={0} variants={petalVariants}>
                <path
                  d="M100 110 C90 110 85 90 100 75 C115 90 110 110 100 110 Z"
                  fill="#f8bbd0"
                  stroke="#f06292"
                  strokeWidth="0.5"
                />
              </motion.g>
              <motion.g custom={1} variants={petalVariants}>
                <path
                  d="M100 110 C85 105 75 85 90 70 C105 85 110 100 100 110 Z"
                  fill="#f48fb1"
                  stroke="#f06292"
                  strokeWidth="0.5"
                />
              </motion.g>
              <motion.g custom={2} variants={petalVariants}>
                <path
                  d="M100 110 C115 105 125 85 110 70 C95 85 90 100 100 110 Z"
                  fill="#f48fb1"
                  stroke="#f06292"
                  strokeWidth="0.5"
                />
              </motion.g>
              <motion.g custom={3} variants={petalVariants}>
                <path
                  d="M100 110 C95 110 90 95 100 85 C110 95 105 110 100 110 Z"
                  fill="#ff80ab"
                  stroke="#f06292"
                  strokeWidth="0.5"
                />
              </motion.g>
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
export default WomensDayPage;
