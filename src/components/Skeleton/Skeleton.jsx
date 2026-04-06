import "../../styles/blog/Skeleton.scss";

const Skeleton = ({ width = "100%", height = "auto", style = {} }) => {
  return <div className="skeleton" style={{ width, height, ...style }} />;
};

export default Skeleton;
