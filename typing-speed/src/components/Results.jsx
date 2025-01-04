import { motion } from "framer-motion";
import { formatPercentage } from "../utils/Helper.js";

const Result = function ({
  errors,
  accuracyPercentage,
  total,
  classname,
  state,
}) {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };
  if (state !== "end") return null;

  return (
    <motion.ul
      className={`flex flex-col items-center text-primary-400 space-y-3 ${classname}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        className="text-xl font-semibold"
        transition={{ ...duration, delay: 0 }}
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Result;
