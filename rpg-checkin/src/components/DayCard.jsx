import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, Star, Circle, CheckCircle2 } from "lucide-react";

export function DayCard({
  day,
  completed,
  justChecked,
  isVideoCompleted,
  areAllVideosCompleted,
  toggleVideo,
  completeDay,
  uncompleteDay,
  disabled,
}) {
  const isBoss = day.xp >= 200;
  const isSpecial = day.xp >= 150;

  const completedCount = useMemo(
    () => day.videos.filter((v) => isVideoCompleted(v.id)).length,
    [day.videos, isVideoCompleted],
  );

  const allCompleted = areAllVideosCompleted;
  const canComplete = allCompleted && !completed && !disabled;

  const handleDayToggle = () => {
    if (disabled) return;
    if (completed) {
      uncompleteDay(day.day);
    } else if (canComplete) {
      completeDay(day.day);
    }
  };

  return (
    <motion.article
      layout
      className={`day-card ${completed ? "checked" : ""} ${disabled ? "locked" : ""} ${
        isBoss ? "boss" : ""
      } ${justChecked ? "pulse" : ""}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
    >
      <div className="day-card-header">
        <div className="day-badge">
          {disabled ? (
            <Lock size={14} />
          ) : completed ? (
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
      </div>

      <div className="day-videos">
        {day.videos.map((video) => {
          const checked = isVideoCompleted(video.id);
          return (
            <label
              key={video.id}
              className={`video-row ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggleVideo(day.day, video.id)}
                aria-label={`${video.title} — +${video.xp} XP`}
              />
              <span className="video-check">
                {checked ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Circle size={16} />
                )}
              </span>
              <span className="video-title">{video.title}</span>
              <span className="video-xp">+{video.xp} XP</span>
            </label>
          );
        })}
      </div>

      <div className="day-footer">
        <span className="day-progress">
          {completed
            ? "Dia completo!"
            : `${completedCount}/${day.videos.length} vídeos assistidos`}
        </span>

        <button
          type="button"
          className={`day-complete-button ${completed ? "completed" : ""} ${canComplete ? "ready" : ""}`}
          onClick={handleDayToggle}
          disabled={!completed && !canComplete}
          aria-pressed={completed}
        >
          {completed ? (
            <>
              <Check size={14} strokeWidth={3} /> Dia completo
            </>
          ) : (
            `Completar dia (+${day.dayBonusXp} XP)`
          )}
        </button>
      </div>

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
            +{day.dayBonusXp} XP
          </motion.span>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
