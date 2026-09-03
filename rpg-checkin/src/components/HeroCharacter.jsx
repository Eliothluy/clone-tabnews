import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LEVEL_STAGES,
  PALETTE,
  composeLayers,
} from "../data/character";
import { PixelSprite } from "./PixelSprite";

const PARTY_COLORS = ["#d4af37", "#e63946", "#2ecc71", "#9b5de5", "#4cc9f0"];
const PARTICLE_COUNT = 14;
const CELEBRATION_MS = 2800;

function buildParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: 8 + Math.random() * 84,
    delay: Math.random() * 0.6,
    size: 4 + Math.round(Math.random() * 4),
    color: PARTY_COLORS[i % PARTY_COLORS.length],
  }));
}

export function HeroCharacter({ level }) {
  const stage = LEVEL_STAGES[level] ?? LEVEL_STAGES[1];
  const rows = useMemo(() => composeLayers(stage.layers), [stage]);
  const palette = useMemo(
    () => ({ ...PALETTE, ...(stage.hoodie ?? {}) }),
    [stage],
  );

  const [celebration, setCelebration] = useState(null);
  const prevLevel = useRef(level);

  // Ao subir de nível, dispara a celebração (partículas + badge + pulo).
  useEffect(() => {
    if (level === prevLevel.current) return;
    const leveledUp = level > prevLevel.current;
    prevLevel.current = level;
    if (!leveledUp) return;

    setCelebration({ level, particles: buildParticles() });
    const timer = setTimeout(() => setCelebration(null), CELEBRATION_MS);
    return () => clearTimeout(timer);
  }, [level]);

  const auraClass = stage.aura ? ` character-aura-${stage.aura}` : "";

  return (
    <div className={`character-stage${auraClass}`}>
      <motion.div
        className="character-bounce"
        animate={
          celebration
            ? { y: [0, -16, 0, -10, 0], scale: [1, 1.06, 1, 1.03, 1] }
            : { y: 0, scale: 1 }
        }
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <motion.div
          key={level}
          className="character-sprite-box"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
          <motion.div
            className="character-bob"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          >
            <PixelSprite
              rows={rows}
              palette={palette}
              className="character-sprite"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <p className="character-quote">{stage.quote}</p>

      <AnimatePresence>
        {celebration && (
          <div key="party" className="character-celebration">
            {celebration.particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="character-particle"
                style={{
                  left: `${particle.left}%`,
                  width: particle.size,
                  height: particle.size,
                  background: particle.color,
                }}
                initial={{ opacity: 0, y: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 1, 0], y: -120, scale: [0.4, 1, 1, 0.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.9, delay: particle.delay, ease: "easeOut" }}
              />
            ))}
            <motion.span
              className="character-levelup"
              initial={{ opacity: 0, scale: 0.4, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.15, 1, 0.9], y: [10, 0, 0, -6] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, times: [0, 0.15, 0.75, 1] }}
            >
              ★ Nível {celebration.level}! ★
            </motion.span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
