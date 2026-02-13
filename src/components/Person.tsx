export default function Person({ type, isPlaying }) {
  return (
    <div className={type}>
      <div className={`head ${isPlaying ? "animate" : ""}`}>
        <div className="hair" />
      </div>

      <div className="arm__left" />
      <div className="arm__right" />

      <div className="body">{type === "you" && <div className="dress" />}</div>

      <div className="leg__left" />
      <div className="leg__right" />
    </div>
  );
}
