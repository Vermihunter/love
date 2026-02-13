import { useState, useRef } from "react";
import Sky from "./Sky";
import Characters from "./Characters";
import Poem from "./Poem";

type Props = {
  poem: string[][];
};

export default function LoveScene({ poem }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.src =
      "https://www.tumblr.com/audio_file/basixxpace-blog/163113191545/tumblr_ot9el0RNp31uugb7d?plead=please-dont-download-this-or-our-lawyers-wont-let-us-host-audio";

    audio.load();
    audio.play();

    setIsPlaying(true);
  };

  return (
    <div className={`ground ${isPlaying ? "animate" : ""}`}>
      <audio ref={audioRef} />

      <button className="play" onClick={handlePlay}>
        play
      </button>

      <Sky isPlaying={isPlaying} />

      <div className={`heart ${isPlaying ? "animate" : ""}`} />
      <Characters isPlaying={isPlaying} />
      <Poem poem={poem} isPlaying={isPlaying} />
    </div>
  );
}
