import { motion } from "framer-motion";
import { Scroll } from "lucide-react";

export function Header() {
  return (
    <header className="app-header">
      <motion.div
        className="header-icon"
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        <Scroll size={44} strokeWidth={1.5} />
      </motion.div>
      <div className="header-text">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Taverna do Dev
        </motion.h1>
        <motion.p
          className="header-subtitle"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Sua jornada de 53 dias pelo clone do TabNews
        </motion.p>
      </div>
    </header>
  );
}
