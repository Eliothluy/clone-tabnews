import { motion } from "framer-motion";

export function ProgressBar({ currentLevel, nextLevel, progressToNext, totalXP }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-header">
        <span className="level-title">{currentLevel.title}</span>
        <span className="level-number">Nível {currentLevel.level}</span>
      </div>

      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progressToNext}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
        />
      </div>

      <div className="progress-footer">
        <span className="xp-current">{totalXP.toLocaleString("pt-BR")} XP</span>
        {nextLevel ? (
          <span className="xp-next">
            {Math.max(0, nextLevel.xp - totalXP).toLocaleString("pt-BR")} XP para{" "}
            {nextLevel.title}
          </span>
        ) : (
          <span className="xp-next">Nível máximo atingido!</span>
        )}
      </div>
    </div>
  );
}
