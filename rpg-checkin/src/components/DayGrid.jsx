import { useState } from "react";
import { motion } from "framer-motion";
import { DayCard } from "./DayCard";
import { DAYS, MILESTONES } from "../data/days";

export function DayGrid({ unlockedDay, justChecked, isChecked, toggleDay }) {
  const [filter, setFilter] = useState("all");

  const filteredDays = DAYS.filter((day) => {
    if (filter === "done") return isChecked(day.day);
    if (filter === "pending") return !isChecked(day.day);
    return true;
  });

  const currentMilestone = (dayNumber) => {
    for (const key of Object.keys(MILESTONES)) {
      const m = MILESTONES[key];
      if (dayNumber >= m.start && dayNumber <= m.end) return m;
    }
    return null;
  };

  return (
    <section className="day-section">
      <div className="day-section-header">
        <h2>Missões Diárias</h2>
        <div className="filter-tabs" role="group" aria-label="Filtrar missões">
          {[
            { key: "all", label: "Todas" },
            { key: "pending", label: "Pendentes" },
            { key: "done", label: "Concluídas" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              aria-pressed={filter === tab.key}
              className={`filter-tab ${filter === tab.key ? "active" : ""}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="day-grid">
        {filteredDays.map((day) => {
          const milestone = currentMilestone(day.day);
          const showMilestoneHeader =
            milestone && day.day === milestone.start;

          return (
            <div key={day.day} className="day-wrapper">
              {showMilestoneHeader && (
                <motion.div
                  className="milestone-divider"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="milestone-line" />
                  <span className="milestone-name">{milestone.name}</span>
                  <span className="milestone-line" />
                </motion.div>
              )}
              <DayCard
                day={day}
                checked={isChecked(day.day)}
                justChecked={justChecked === day.day}
                onToggle={toggleDay}
                disabled={day.day > unlockedDay && !isChecked(day.day)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
