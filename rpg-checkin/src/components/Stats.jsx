import { motion } from "framer-motion";
import { Flame, Trophy, CalendarCheck } from "lucide-react";

export function Stats({ streak, completion, checkedCount, totalDays }) {
  return (
    <div className="stats-grid">
      <motion.div
        className="stat-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Flame size={24} className="stat-icon stat-fire" />
        <div className="stat-value">{streak}</div>
        <div className="stat-label">Dias seguidos</div>
      </motion.div>

      <motion.div
        className="stat-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Trophy size={24} className="stat-icon stat-trophy" />
        <div className="stat-value">{completion}%</div>
        <div className="stat-label">Concluído</div>
      </motion.div>

      <motion.div
        className="stat-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CalendarCheck size={24} className="stat-icon stat-calendar" />
        <div className="stat-value">
          {checkedCount}/{totalDays}
        </div>
        <div className="stat-label">Dias completos</div>
      </motion.div>
    </div>
  );
}
