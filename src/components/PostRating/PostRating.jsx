import { useMemo, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../../styles/blog/PostRating.scss";

const MAX_STARS = 5;

function stripHtml(value) {
  if (!value) return "";
  return String(value).replace(/<[^>]*>/g, "").trim();
}

function getVotedKey(postId) { return `rating_voted_${postId}`; }
function hasVoted(postId) {
  if (typeof window === "undefined") return false;
  try { return window.localStorage.getItem(getVotedKey(postId)) === "1"; }
  catch { return false; }
}
function setVoted(postId) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(getVotedKey(postId), "1"); }
  catch { /* ignore */ }
}
function clearVoted(postId) {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(getVotedKey(postId)); }
  catch { /* ignore */ }
}

const PostRating = ({ postId, postTitle = "", postUrl = "", ratingTotal = 0, ratingCount = 0, apiBase, className = "", size = "md" }) => {
  const [hovered, setHovered] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [localTotal, setLocalTotal] = useState(Number(ratingTotal) || 0);
  const [localCount, setLocalCount] = useState(Number(ratingCount) || 0);
  const [voted, setVotedState] = useState(() => hasVoted(postId));
  const [error, setError] = useState("");

  const averageNumber = useMemo(() => (!localCount ? 0 : localTotal / localCount), [localTotal, localCount]);
  const averageDisplay = useMemo(() => (!localCount ? "0.0" : averageNumber.toFixed(1)), [averageNumber, localCount]);
  const cleanTitle = useMemo(() => stripHtml(postTitle), [postTitle]);

  const jsonLd = useMemo(() => {
    if (!postUrl || !cleanTitle || localCount <= 0) return null;
    return {
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: cleanTitle, mainEntityOfPage: postUrl, url: postUrl,
      aggregateRating: { "@type": "AggregateRating", ratingValue: Number(averageDisplay), ratingCount: Number(localCount), bestRating: 5, worstRating: 1 },
    };
  }, [postUrl, cleanTitle, localCount, averageDisplay]);

  async function handleVote(value) {
    if (!postId || voted || submitting) return;
    setError(""); setSubmitting(true);
    const prevTotal = localTotal; const prevCount = localCount;
    setLocalTotal((t) => t + value); setLocalCount((c) => c + 1); setVotedState(true); setVoted(postId);

    try {
      const res = await fetch(`${apiBase}/rate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, rating: value }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setLocalTotal(Number(data?.rating_total ?? prevTotal + value) || 0);
      setLocalCount(Number(data?.rating_count ?? prevCount + 1) || 0);
    } catch {
      setLocalTotal(prevTotal); setLocalCount(prevCount); setVotedState(false); clearVoted(postId);
      setError("Could not save your rating. Try again.");
    } finally { setSubmitting(false); }
  }

  function onKeyVote(e, value) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleVote(value); }
  }

  return (
    <section className={`post-rating ${size === "sm" ? "post-rating--sm" : ""} ${className}`}>
      <div className="post-rating__inner">
        <div>
          <div className="post-rating__stars" role="radiogroup" aria-label="Star rating">
            {Array.from({ length: MAX_STARS }).map((_, i) => {
              const starValue = i + 1;
              let Icon = FaRegStar;
              if (hovered) { if (starValue <= hovered) Icon = FaStar; }
              else { if (averageNumber >= starValue) Icon = FaStar; else if (averageNumber >= starValue - 0.5) Icon = FaStarHalfAlt; }

              return (
                <button key={starValue} type="button" className={`post-rating__star ${voted ? "is-locked" : ""}`}
                  onMouseEnter={() => setHovered(starValue)} onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(starValue)} onBlur={() => setHovered(null)}
                  onClick={() => handleVote(starValue)} onKeyDown={(e) => onKeyVote(e, starValue)}
                  disabled={voted || submitting} aria-label={`${starValue} ${starValue === 1 ? "star" : "stars"}`}
                  aria-checked={starValue === Math.round(averageNumber)} role="radio">
                  <Icon />
                </button>
              );
            })}
          </div>
          <div className="post-rating__status" aria-live="polite">
            {voted && !error ? "Rating saved." : ""}{error}
          </div>
        </div>
        <div>
          <p className="post-rating__subtitle">
            {localCount > 0
              ? <><strong>{averageDisplay}</strong>/5 · {localCount} {localCount === 1 ? "vote" : "votes"}</>
              : "Be the first to rate"}
          </p>
        </div>
      </div>

      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </section>
  );
};

export default PostRating;
