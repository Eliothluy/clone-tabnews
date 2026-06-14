import { Header } from "./components/Header";
import { ProgressBar } from "./components/ProgressBar";
import { Stats } from "./components/Stats";
import { DayGrid } from "./components/DayGrid";
import { Footer } from "./components/Footer";
import { useProgress } from "./hooks/useProgress";
import { DAYS } from "./data/days";

function App() {
  const {
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
            checkedCount={checked.length}
            totalDays={DAYS.length}
          />
        </section>

        <DayGrid
          unlockedDay={unlockedDay}
          justChecked={justChecked}
          isChecked={isChecked}
          toggleDay={toggleDay}
        />
      </main>

      <Footer onReset={resetProgress} />
    </div>
  );
}

export default App;
