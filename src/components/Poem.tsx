type Props = {
  poem: string[][];
  isPlaying: boolean;
};

export default function Poem({ poem, isPlaying }: Props) {
  return (
    <div className="poem">
      <h1 className="title">I &lt;3 Every Pixel of You</h1>

      {poem.map((estrofe, i) => (
        <div className={`estrofe ${isPlaying ? "animate" : ""}`} key={i}>
          {estrofe.map((line, j) => (
            <p className="verse" key={j}>
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
