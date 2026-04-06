import { useEffect, useState } from "react";
import "../../styles/blog/ReadingProgressBar.scss";

const ReadingProgressBar = ({ targetRef, readingTime }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!readingTime || !targetRef.current) return;

    const updateProgress = () => {
      if (!targetRef.current) return;
      const element = targetRef.current;
      const totalHeight = element.clientHeight - window.innerHeight;
      const currentProgress = window.scrollY - element.offsetTop;
      if (totalHeight === 0) return setProgress(0);
      const percentage = (currentProgress / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, [targetRef, readingTime]);

  if (!readingTime) return null;

  return (
    <div className="reading-progress-container">
      <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgressBar;
