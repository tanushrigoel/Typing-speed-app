const formatPercentage = function (percentage) {
  return percentage.toFixed(0) + "%";
};

const countErrors = function (actual, expected) {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChr, i) => {
    const actualChr = actual[i];
    if (actualChr !== expectedChr) {
      errors++;
    }
    return errors;
  }, 0);
};

const calculateAccuracyPercentage = function (errors, total) {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }
  return 0;
};

export { formatPercentage, countErrors, calculateAccuracyPercentage };
