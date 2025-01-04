import { faker } from "@faker-js/faker";
import { useState, useCallback } from "react";

const generatedWords = function ( count ) {
  return faker.commerce.productDescription(count).toLowerCase();
};

export const useWords = function ({ count }) {
  const [words, setWords] = useState(generatedWords(count));
  const updatedWords = useCallback(() => {
    setWords(generatedWords(count));
  }, [count]);
  return { words, updatedWords };
};
