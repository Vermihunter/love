import Person from "./Person";

export default function Characters({ isPlaying }) {
  return (
    <div className={`us ${isPlaying ? "animate" : ""}`}>
      <ul className={`minihearts ${isPlaying ? "animate" : ""}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <li className="miniheart" key={i} />
        ))}
      </ul>

      <Person type="me" isPlaying={isPlaying} />
      <Person type="you" isPlaying={isPlaying} />
    </div>
  );
}
