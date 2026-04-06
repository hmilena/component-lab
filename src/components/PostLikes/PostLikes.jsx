import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../../styles/blog/PostLikes.scss";

function getVoteKey(postId) { return `likes_vote_${postId}`; }
function getStoredVote(postId) {
  if (typeof window === "undefined") return 0;
  try { const v = window.localStorage.getItem(getVoteKey(postId)); return Number(v) === 1 ? 1 : 0; }
  catch { return 0; }
}
function setStoredVote(postId, value) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(getVoteKey(postId), String(value)); }
  catch { /* ignore */ }
}

const PostLikes = ({ postId, likesCount = 0, apiBase, className = "", size = "md" }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [localCount, setLocalCount] = useState(Number(likesCount) || 0);
  const [isLiked, setIsLiked] = useState(() => getStoredVote(postId) === 1);

  async function toggleVote() {
    if (!postId || submitting) return;
    setError("");
    setSubmitting(true);

    const prevLiked = isLiked;
    const nextLiked = !prevLiked;
    const nextValue = nextLiked ? 1 : 0;
    const prevCount = localCount;

    setLocalCount((c) => (nextLiked ? c + 1 : Math.max(0, c - 1)));
    setIsLiked(nextLiked);
    setStoredVote(postId, nextValue);

    try {
      const res = await fetch(`${apiBase}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, value: nextValue }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const nextCount = data?.likes_count;
      if (typeof nextCount !== "undefined") setLocalCount(Number(nextCount) || 0);
    } catch {
      setLocalCount(prevCount);
      setIsLiked(prevLiked);
      setStoredVote(postId, prevLiked ? 1 : 0);
      setError("Could not save your like. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={`post-likes ${size === "sm" ? "post-likes--sm" : ""} ${className}`} aria-label="Like post">
      <div className="post-likes__inner">
        <button type="button" className={`post-likes__btn ${isLiked ? "is-liked" : ""}`}
          onClick={toggleVote} disabled={submitting} aria-pressed={isLiked} aria-label={isLiked ? "Unlike" : "Like"}>
          <span className="post-likes__icon-wrapper">
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span className="post-likes__sparkles"><i /><i /><i /><i /><i /></span>
          </span>
        </button>
        <p className="post-likes__meta" aria-live="polite">
          {localCount === 0 ? <span>Like</span> : <><strong>{localCount}</strong> {localCount === 1 ? "like" : "likes"}</>}
        </p>
        <div className="post-likes__status" aria-live="polite">{error}</div>
      </div>
    </section>
  );
};

export default PostLikes;
