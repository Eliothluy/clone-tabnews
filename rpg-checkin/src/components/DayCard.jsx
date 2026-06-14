import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, Star } from "lucide-react";

export function DayCard({ day, checked, justChecked, onToggle, disabled }) {
  const isBoss = day.xp >= 200;
  const isSpecial = day.xp >= 150;

  return (
    <motion.article
      layout
      className={`day-card ${checked ? "checked" : ""} ${disabled ? "locked" : ""} ${
        isBoss ? "boss" : ""
      } ${justChecked ? "pulse" : ""}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={disabled ? {} : { y: -4, scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
    >
      <button
        type="button"
        className="day-button"
        onClick={() => onToggle(day.day)}
        disabled={disabled}
        aria-pressed={checked}
        aria-label={`Dia ${day.day}: ${day.title}`}
      >
        <div className="day-badge">
          {disabled ? (
            <Lock size={14} />
          ) : checked ? (
            <Check size={16} strokeWidth={3} />
          ) : (
            <span className="day-number">{day.day}</span>
          )}
        </div>

        <div className="day-content">
          <h3 className="day-title">{day.title}</h3>
          <p className="day-summary">{day.summary}</p>
        </div>

        <div className="day-xp">
          {isSpecial && <Star size={12} className="xp-star" />}
          <span>+{day.xp} XP</span>
        </div>
      </button>

      <AnimatePresence>
        {justChecked && (
          <motion.span
            key="floating-xp"
            className="floating-xp"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -40, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            +{day.xp} XP
          </motion.span>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
