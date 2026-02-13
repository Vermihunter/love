import Person from "./Person";

type Props = {
  isPlaying: boolean;
};

export default function Characters({ isPlaying }: Props) {
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
