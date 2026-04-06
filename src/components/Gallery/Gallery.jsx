import { useCarousel } from "../../hooks/useCarousel";
import "../../styles/blog/Gallery.scss";

const Gallery = ({
  items,
  renderMain,
  renderThumb,
  showThumbs = true,
  autoplay = false,
}) => {
  const length = items?.length || 0;
  const { index, next, prev, goTo, hasNext, hasPrev } = useCarousel({ length, autoplay });

  if (!items || items.length === 0) return null;

  const activeItem = items[index];

  return (
    <div className="gallery">
      <div className="gallery-main">
        <button type="button" className="gallery-arrow gallery-arrow--prev" onClick={prev} disabled={!hasPrev}>‹</button>
        <div className="gallery-main-inner">
          {renderMain ? renderMain(activeItem, index) : null}
        </div>
        <button type="button" className="gallery-arrow gallery-arrow--next" onClick={next} disabled={!hasNext}>›</button>
      </div>

      {showThumbs && length > 1 && renderThumb && (
        <div className="gallery-thumbs">
          {items.map((item, i) => (
            <button
              key={item.id ?? i}
              type="button"
              className={"gallery-thumb" + (i === index ? " gallery-thumb--active" : "")}
              onClick={() => goTo(i)}
            >
              {renderThumb(item, i)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
