import "./App.css";
import RestartButton from "./components/Restartbtn";
import Result from "./components/Results";
import { Usertypings } from "./components/Usertypings";
import { useEngine } from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/Helper";

const GenerateData = function ({ data }) {
  return <div className="text-slate-500">{data}</div>;
};

const CountDownTimer = function ({ timeleft }) {
  return <div className="text-primary-500 font-medium">Time: {timeleft}</div>;
};

function App() {
  const { state, words, timeLeft, typed, errors, totalTyped, restart } =
    useEngine();

  return (
    <>
      <CountDownTimer timeleft={timeLeft} />
      <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">
        <GenerateData data={words} />
        <Usertypings
          className="absolute inset-0"
          userInput={typed}
          words={words}
        />
      </div>
      <RestartButton
        className="mx-auto mt-10 text-state-500"
        onRestart={restart}
      />
      <Result
        classname="mt-10"
        errors={errors}
        state={state}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      ></Result>
    </>
  );
}

export default App;
