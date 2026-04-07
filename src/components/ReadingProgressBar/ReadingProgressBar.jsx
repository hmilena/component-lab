import { useEffect, useState } from "react";
import "../../styles/blog/ReadingProgressBar.scss";

const ReadingProgressBar = ({ targetRef, readingTime, sticky = false }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!readingTime || !targetRef.current) return;

    const element = targetRef.current;

    const updateProgress = () => {
      const scrollable = element.scrollHeight - element.clientHeight;
      if (scrollable === 0) return setProgress(0);
      const percentage = (element.scrollTop / scrollable) * 100;
      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    element.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => element.removeEventListener("scroll", updateProgress);
  }, [targetRef, readingTime]);

  if (!readingTime) return null;

  return (
    <div className={`reading-progress-container${sticky ? " reading-progress-container--sticky" : ""}`}>
      <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgressBar;
