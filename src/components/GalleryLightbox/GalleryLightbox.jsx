import { useEffect, useRef, useState } from "react";
import { useCarousel } from "../../hooks/useCarousel";
import { useBodyClass } from "../../hooks/useBodyClass";
import { FaCompress, FaExpand } from "react-icons/fa6";
import "../../styles/blog/GalleryLightbox.scss";

const GalleryLightbox = ({
  items,
  isOpen,
  initialIndex = 0,
  onClose,
  renderMain,
  renderThumb,
  thumbsPerView = 6,
  showThumbs = true,
}) => {
  const length = items?.length || 0;
  const { index, next, prev, goTo } = useCarousel({ length, loop: true });

  const [isCleanView, setIsCleanView] = useState(false);
  const toggleCleanView = (e) => {
    e.stopPropagation();
    setIsCleanView((prev) => !prev);
  };

  const perView = thumbsPerView > 0 ? thumbsPerView : 1;
  const maxStart = Math.max(0, length - perView);
  const [thumbStart, setThumbStart] = useState(0);

  const visibleThumbs = items.slice(thumbStart, thumbStart + perView);
  const canThumbPrev = thumbStart > 0;
  const canThumbNext = thumbStart < maxStart;

  const moveThumbWindowPrev = () => setThumbStart((s) => Math.max(0, s - 1));
  const moveThumbWindowNext = () => setThumbStart((s) => Math.min(maxStart, s + 1));

  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const onThumbsMouseDown = (e) => { setIsDragging(true); setDragStartX(e.clientX); setScrollStart(dragRef.current.scrollLeft); };
  const onThumbsMouseMove = (e) => { if (!isDragging) return; dragRef.current.scrollLeft = scrollStart - (e.clientX - dragStartX); };
  const onThumbsMouseUp = () => setIsDragging(false);
  const onThumbsMouseLeave = () => setIsDragging(false);
  const onThumbsTouchStart = (e) => { setIsDragging(true); setDragStartX(e.touches[0].clientX); setScrollStart(dragRef.current.scrollLeft); };
  const onThumbsTouchMove = (e) => { if (!isDragging) return; dragRef.current.scrollLeft = scrollStart - (e.touches[0].clientX - dragStartX); };
  const onThumbsTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (!isOpen) return;
    goTo(initialIndex);
    setIsCleanView(false);
    const centeredStart = Math.min(Math.max(0, initialIndex - Math.floor(perView / 2)), maxStart);
    setThumbStart(centeredStart);
  }, [isOpen, initialIndex, perView, maxStart, goTo]);

  useEffect(() => {
    if (!isOpen) return;
    setThumbStart((prevStart) => {
      if (index >= prevStart && index < prevStart + perView) return prevStart;
      if (index < prevStart) return index;
      return Math.min(maxStart, Math.max(0, index - perView + 1));
    });
  }, [index, isOpen, perView, maxStart]);

  useBodyClass("no-scroll", isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, next, prev, onClose]);

  if (!isOpen || length === 0) return null;

  const activeItem = items[index];

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className={"lightbox" + (isCleanView ? " lightbox--clean-view" : "")} onClick={(e) => e.stopPropagation()}>
        <button className={"lightbox-open-image lightbox-toggle-clean" + (isCleanView ? " lightbox-toggle-clean--active" : "")} onClick={toggleCleanView}>
          {isCleanView ? <FaCompress /> : <FaExpand />}
        </button>

        <button className="lightbox-close" onClick={onClose}>✕</button>

        <div className="lightbox-main">
          {!isCleanView && <button className="lightbox-prev" onClick={prev}>‹</button>}
          <div className="lightbox-main-inner">
            {renderMain(activeItem, index, { isCleanView })}
          </div>
          {!isCleanView && <button className="lightbox-next" onClick={next}>›</button>}
        </div>

        {!isCleanView && showThumbs && length > 1 && (
          <div className="lightbox-thumbs-wrapper">
            {length > perView && (
              <button className="lightbox-thumbs-arrow lightbox-thumbs-arrow--left" onClick={moveThumbWindowPrev} disabled={!canThumbPrev}>‹</button>
            )}
            <div className="lightbox-thumbs" ref={dragRef}
              onMouseDown={onThumbsMouseDown} onMouseMove={onThumbsMouseMove} onMouseUp={onThumbsMouseUp} onMouseLeave={onThumbsMouseLeave}
              onTouchStart={onThumbsTouchStart} onTouchMove={onThumbsTouchMove} onTouchEnd={onThumbsTouchEnd}
            >
              {visibleThumbs.map((item, i) => {
                const realIndex = thumbStart + i;
                return (
                  <button key={item.id ?? realIndex} className={"lightbox-thumb" + (realIndex === index ? " lightbox-thumb--active" : "")} onClick={() => goTo(realIndex)}>
                    {renderThumb(item, realIndex)}
                  </button>
                );
              })}
            </div>
            {length > perView && (
              <button className="lightbox-thumbs-arrow lightbox-thumbs-arrow--right" onClick={moveThumbWindowNext} disabled={!canThumbNext}>›</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryLightbox;
