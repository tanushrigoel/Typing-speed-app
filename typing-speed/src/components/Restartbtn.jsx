import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

const RestartButton = ({ onRestart, className = "" }) => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
    onRestart();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`block rounded px-8 py-2 hover:bg-slate-700/50 ${className}`}
    >
      <MdRefresh className="w-6 h-6 text-slate-600" />
    </button>
  );
};

export default RestartButton;
