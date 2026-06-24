import { Header } from "./components/Header";
import { ProgressBar } from "./components/ProgressBar";
import { Stats } from "./components/Stats";
import { DayGrid } from "./components/DayGrid";
import { Footer } from "./components/Footer";
import { useProgress } from "./hooks/useProgress";
import { DAYS } from "./data/days";

function App() {
  const {
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
    areAllVideosCompleted,
    toggleVideo,
    completeDay,
    uncompleteDay,
    resetProgress,
  } = useProgress();

  return (
    <div className="app">
      <div className="app-glow" aria-hidden="true" />
      <main className="app-main">
        <Header />

        <section className="hero-panel">
          <ProgressBar
            currentLevel={currentLevel}
            nextLevel={nextLevel}
            progressToNext={progressToNext}
            totalXP={totalXP}
          />
          <Stats
            streak={streak}
            completion={completion}
            checkedCount={completedDays.length}
            totalDays={DAYS.length}
          />
        </section>

        <DayGrid
          unlockedDay={unlockedDay}
          justCheckedDay={justCheckedDay}
          isVideoCompleted={isVideoCompleted}
          isDayCompleted={isDayCompleted}
          areAllVideosCompleted={areAllVideosCompleted}
          toggleVideo={toggleVideo}
          completeDay={completeDay}
          uncompleteDay={uncompleteDay}
        />
      </main>

      <Footer onReset={resetProgress} />
    </div>
  );
}

export default App;
