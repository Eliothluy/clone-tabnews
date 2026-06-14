import { useState, useEffect, useCallback, useMemo } from "react";
import { DAYS, LEVELS } from "../data/days";

const STORAGE_KEY = "rpg-checkin-progress-v1";

function loadChecked() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const saved = JSON.parse(raw);
    if (saved && Array.isArray(saved.checked)) return saved.checked;
    return [];
  } catch {
    return [];
  }
}

function saveProgress(checked) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ checked }));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [checked, setChecked] = useState(() => loadChecked());
  const [justChecked, setJustChecked] = useState(null);

  useEffect(() => {
    saveProgress(checked);
  }, [checked]);

  // `unlockedDay` é derivado de `checked` — não há motivo para ser estado
  // independente (e correr risco de dessincronia com o que está salvo).
  const unlockedDay = useMemo(
    () => (checked.length ? Math.max(...checked) + 1 : 1),
    [checked]
  );

  const totalXP = useMemo(() => {
    return checked.reduce((sum, dayNumber) => {
      const day = DAYS.find((d) => d.day === dayNumber);
      return sum + (day?.xp ?? 100);
    }, 0);
  }, [checked]);

  const { currentLevel, nextLevel, progressToNext } = useMemo(() => {
    let current = LEVELS[0];
    let next = LEVELS[1];

    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (totalXP >= LEVELS[i].xp) {
        current = LEVELS[i];
        next = LEVELS[i + 1] ?? null;
        break;
      }
    }

    if (!next) {
      return { currentLevel: current, nextLevel: null, progressToNext: 100 };
    }

    const range = next.xp - current.xp;
    const earned = totalXP - current.xp;
    const progressToNext = Math.min(100, Math.max(0, (earned / range) * 100));

    // `nextLevel` deve ser explícito: como shorthand, ele resolveria para a
    // const `nextLevel` do escopo externo, que ainda está no TDZ neste momento
    // (o useMemo executa o callback durante a própria inicialização dela).
    return { currentLevel: current, nextLevel: next, progressToNext };
  }, [totalXP]);

  const streak = useMemo(() => {
    if (checked.length === 0) return 0;
    const sorted = [...checked].sort((a, b) => a - b);
    let streakCount = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      if (sorted[i] - sorted[i - 1] === 1) {
        streakCount++;
      } else {
        break;
      }
    }
    return streakCount;
  }, [checked]);

  const completion = useMemo(() => {
    return Math.round((checked.length / DAYS.length) * 100);
  }, [checked]);

  const isChecked = useCallback(
    (dayNumber) => checked.includes(dayNumber),
    [checked]
  );

  // Side effects (setJustChecked + setTimeout) ficam fora do updater do
  // setChecked — updaters devem ser puros; aninhá-los faz o React dispará-los
  // duas vezes em StrictMode (dev) e vaza o timer do setTimeout.
  const toggleDay = useCallback(
    (dayNumber) => {
      const isCurrentlyChecked = checked.includes(dayNumber);
      const next = isCurrentlyChecked
        ? checked.filter((d) => d !== dayNumber)
        : [...checked, dayNumber].sort((a, b) => a - b);
      setChecked(next);

      if (!isCurrentlyChecked) {
        setJustChecked(dayNumber);
        setTimeout(() => setJustChecked(null), 1200);
      }
    },
    [checked]
  );

  const resetProgress = useCallback(() => {
    if (window.confirm("Tem certeza que deseja reiniciar toda a jornada?")) {
      setChecked([]);
      setJustChecked(null);
    }
  }, []);

  return {
    checked,
    totalXP,
    currentLevel,
    nextLevel,
    progressToNext,
    streak,
    completion,
    unlockedDay,
    justChecked,
    isChecked,
    toggleDay,
    resetProgress,
  };
}
