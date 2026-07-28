function StackBox({ value, isTop }) {
  return (
    <div className={`stack-box ${isTop ? "top-stack-box" : ""}`}>
      {isTop && <span className="top-label">TOP</span>}

      <strong>{value}</strong>
    </div>
  );
}

export default StackBox;
