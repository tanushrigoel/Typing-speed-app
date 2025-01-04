import { Caret } from "./Caret";
import cn from "classnames";

export const Usertypings = function ({ userInput, className, words }) {
  const typedChars = userInput.split("");
  return (
    <div className={`${className}`}>
      {typedChars.map((char, ind) => {
        return (
          <Character
            key={`${char} ${ind}`}
            expected={words[ind]}
            actual={char}
          />
        );
      })}
      <Caret />
    </div>
  );
};

const Character = ({ expected, actual }) => {
  const isCorrect = expected === actual;
  const isWhitespace = expected === " ";
  // console.log(expected);
  // console.log(actual);
  // console.log(isCorrect);
  // console.log(!isCorrect && isWhitespace);
  let classname;
  if (!isCorrect && isWhitespace) {
    classname = "text-red-500/50";
  } else if (isCorrect && !isWhitespace) {
    classname = "text-primary-500";
  } else if (!isCorrect && !isWhitespace) {
    classname = "text-red-500";
  }
  // console.log(classname);
  

  return (
    <>
      <span className={`${classname}`}>{expected}</span>
    </>
  );
};

// cn({
//   "text-red-500/50": !isCorrect && isWhitespace, // Correctly typed space
//   "text-primary-500": isCorrect && !isWhitespace, // Correct non-whitespace character
//   "text-red-500": !isCorrect && !isWhitespace, // Unmatched space
// })
