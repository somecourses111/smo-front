import React, { useEffect } from "react";
import { motion, usePresence } from "framer-motion";

export default function Transition({
  children,
  duration = 0.1,
  removeAfter = 120,
}) {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      setTimeout(safeToRemove, removeAfter);
    }
  }, [isPresent, safeToRemove]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      layout
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
