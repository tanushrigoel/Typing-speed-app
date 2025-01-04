import { useCallback, useEffect, useState } from "react";
import { useWords } from "./useWords";
import useCountdownTimer from "./useCountDownTimer";
import useTypings from "./useTypings";
import { countErrors } from "../utils/Helper";

export const state = "start" | "run" | "end";
const NUMBER_OF_WORDS = 15;
const COUNTDOWN_SECONDS = 30;

export const useEngine = () => {
  const [state, setState] = useState("start");
  const { words, updatedWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTyped, totalTyped } = useTypings(
    state != "end"
  );

  const isStarting = state === "start" && cursor > 0;

  const [errors, setErrors] = useState(0);

  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prev) => prev + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  useEffect(() => {
    if (!timeLeft) {
      setState("end");
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updatedWords();
      clearTyped();
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    areWordsFinished,
    updatedWords,
    sumErrors,
  ]);

  const restart = useCallback(() => {
    resetCountdown();
    resetTyped();
    setState("start");
    setErrors(0);
    updatedWords();
    clearTyped();
  }, [clearTyped, updatedWords, resetCountdown, resetTyped]);

  return { state, words, timeLeft, typed, errors, totalTyped, restart };
};
