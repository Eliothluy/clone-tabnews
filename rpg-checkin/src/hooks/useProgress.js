import { useState, useEffect, useCallback, useMemo } from "react";
import { DAYS, LEVELS } from "../data/days";

const STORAGE_KEY = "rpg-checkin-progress-v2";

function getAllVideoIdsForDay(dayNumber) {
  const day = DAYS.find((d) => d.day === dayNumber);
  return day ? day.videos.map((v) => v.id) : [];
}

function migrateV1(saved) {
  if (!saved || !Array.isArray(saved.checked)) return null;

  const completedDays = [...saved.checked].sort((a, b) => a - b);
  const completedVideos = completedDays.flatMap(getAllVideoIdsForDay);

  return { completedVideos, completedDays };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const legacyRaw = localStorage.getItem("rpg-checkin-progress-v1");
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw);
        const migrated = migrateV1(legacy);
        if (migrated) return migrated;
      }
      return { completedVideos: [], completedDays: [] };
    }

    const saved = JSON.parse(raw);
    if (
      saved &&
      Array.isArray(saved.completedVideos) &&
      Array.isArray(saved.completedDays)
    ) {
      return {
        completedVideos: saved.completedVideos,
        completedDays: saved.completedDays,
      };
    }

    return { completedVideos: [], completedDays: [] };
  } catch {
    return { completedVideos: [], completedDays: [] };
  }
}

function saveProgress(completedVideos, completedDays) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completedVideos, completedDays }),
    );
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [completedVideos, setCompletedVideos] = useState(
    () => loadProgress().completedVideos,
  );
  const [completedDays, setCompletedDays] = useState(
    () => loadProgress().completedDays,
  );
  const [justCheckedDay, setJustCheckedDay] = useState(null);

  useEffect(() => {
    saveProgress(completedVideos, completedDays);
  }, [completedVideos, completedDays]);

  const isVideoCompleted = useCallback(
    (videoId) => completedVideos.includes(videoId),
    [completedVideos],
  );

  const isDayCompleted = useCallback(
    (dayNumber) => completedDays.includes(dayNumber),
    [completedDays],
  );

  const getCompletedVideosForDay = useCallback(
    (dayNumber) => {
      const day = DAYS.find((d) => d.day === dayNumber);
      if (!day) return [];
      return day.videos.filter((v) => completedVideos.includes(v.id));
    },
    [completedVideos],
  );

  const areAllVideosCompleted = useCallback(
    (dayNumber) => {
      const day = DAYS.find((d) => d.day === dayNumber);
      if (!day) return false;
      return day.videos.every((v) => completedVideos.includes(v.id));
    },
    [completedVideos],
  );

  const unlockedDay = useMemo(() => {
    return completedDays.length ? Math.max(...completedDays) + 1 : 1;
  }, [completedDays]);

  const totalXP = useMemo(() => {
    const videosXP = completedVideos.reduce((sum, videoId) => {
      for (const day of DAYS) {
        const video = day.videos.find((v) => v.id === videoId);
        if (video) return sum + video.xp;
      }
      return sum;
    }, 0);

    const daysBonusXP = completedDays.reduce((sum, dayNumber) => {
      const day = DAYS.find((d) => d.day === dayNumber);
      return sum + (day?.dayBonusXp ?? 0);
    }, 0);

    return videosXP + daysBonusXP;
  }, [completedVideos, completedDays]);

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

    return { currentLevel: current, nextLevel: next, progressToNext };
  }, [totalXP]);

  const streak = useMemo(() => {
    if (completedDays.length === 0) return 0;
    const sorted = [...completedDays].sort((a, b) => a - b);
    let streakCount = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      if (sorted[i] - sorted[i - 1] === 1) {
        streakCount++;
      } else {
        break;
      }
    }
    return streakCount;
  }, [completedDays]);

  const completion = useMemo(() => {
    return Math.round((completedDays.length / DAYS.length) * 100);
  }, [completedDays]);

  const toggleVideo = useCallback(
    (dayNumber, videoId) => {
      setCompletedVideos((prev) => {
        const next = prev.includes(videoId)
          ? prev.filter((id) => id !== videoId)
          : [...prev, videoId].sort();
        return next;
      });

      // Se desmarcar um vídeo, o dia deixa de estar completo.
      setCompletedDays((prev) => {
        if (prev.includes(dayNumber)) {
          return prev.filter((d) => d !== dayNumber).sort((a, b) => a - b);
        }
        return prev;
      });
    },
    [],
  );

  const completeDay = useCallback((dayNumber) => {
    setCompletedDays((prev) => {
      if (prev.includes(dayNumber)) return prev;
      return [...prev, dayNumber].sort((a, b) => a - b);
    });
    setJustCheckedDay(dayNumber);
    setTimeout(() => setJustCheckedDay(null), 1200);
  }, []);

  const uncompleteDay = useCallback((dayNumber) => {
    setCompletedDays((prev) =>
      prev.filter((d) => d !== dayNumber).sort((a, b) => a - b),
    );
  }, []);

  const resetProgress = useCallback(() => {
    if (window.confirm("Tem certeza que deseja reiniciar toda a jornada?")) {
      setCompletedVideos([]);
      setCompletedDays([]);
      setJustCheckedDay(null);
    }
  }, []);

  return {
    completedVideos,
    completedDays,
    totalXP,
    currentLevel,
    nextLevel,
    progressToNext,
    streak,
    completion,
    unlockedDay,
    justCheckedDay,
    isVideoCompleted,
    isDayCompleted,
    getCompletedVideosForDay,
    areAllVideosCompleted,
    toggleVideo,
    completeDay,
    uncompleteDay,
    resetProgress,
  };
}
