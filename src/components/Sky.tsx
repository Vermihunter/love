type Props = {
  isPlaying: boolean;
};

export default function Sky({ isPlaying }: Props) {
  return (
    <ul className={`sky ${isPlaying ? "animate" : ""}`}>
      {Array.from({ length: 420 }).map((_, i) => (
        <li className={`star ${isPlaying ? "animate" : ""}`} key={i} />
      ))}
    </ul>
  );
}
