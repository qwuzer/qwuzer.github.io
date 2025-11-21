import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type RepeatMode = "off" | "all" | "one";

const playlist = [
  {
    title: "Ocean Avenue",
    artist: "Pufino",
    duration: "3:30",
    src: "https://cdn.pixabay.com/download/audio/2023/03/28/audio_53ebefb10b.mp3?filename=ocean-avenue-143173.mp3",
  },
  {
    title: "Snow Outside",
    artist: "SoulProdMusic",
    duration: "2:54",
    src: "https://cdn.pixabay.com/download/audio/2022/02/16/audio_6f4caa7a40.mp3?filename=snow-outside-159523.mp3",
  },
  {
    title: "City Vibes",
    artist: "Ashot-Danielyan-Composer",
    duration: "3:48",
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_0b5f6b2596.mp3?filename=city-vibes-11099.mp3",
  },
  {
    title: "Night Drive",
    artist: "Coma-Media",
    duration: "4:02",
    src: "https://cdn.pixabay.com/download/audio/2022/03/01/audio_9a5f765437.mp3?filename=night-drive-13877.mp3",
  },
];

export const MusicWindow = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initialVolume = useRef(volume);

  const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return "0:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const getRandomTrackIndex = (exclude: number) => {
    if (playlist.length <= 1) return exclude;
    const candidates = playlist
      .map((_, index) => index)
      .filter((index) => index !== exclude);
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  useEffect(() => {
    const audio = new Audio(playlist[0].src);
    audioRef.current = audio;
    audio.preload = "metadata";
    audio.volume = initialVolume.current / 100;

    const handleTimeUpdate = () => {
      if (!audio.duration) return;
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[currentTrack].src;
    audio.load();
    setCurrentTime(0);
    setProgress(0);
    if (isPlaying) {
      audio
        .play()
        .then(() => {
          setDuration(audio.duration || 0);
        })
        .catch(() => setIsPlaying(false));
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
        return;
      }

      const nextIndex = (() => {
        if (isShuffle) {
          return getRandomTrackIndex(currentTrack);
        }
        if (currentTrack === playlist.length - 1) {
          return repeatMode === "all" ? 0 : null;
        }
        return currentTrack + 1;
      })();

      if (nextIndex === null) {
        setIsPlaying(false);
        audio.currentTime = 0;
        setCurrentTime(0);
        setProgress(0);
        return;
      }

      setCurrentTrack(nextIndex);
      setIsPlaying(true);
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, isShuffle, repeatMode]);

  const handleNext = () => {
    setCurrentTrack((prev) =>
      isShuffle ? getRandomTrackIndex(prev) : (prev + 1) % playlist.length
    );
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) =>
      isShuffle
        ? getRandomTrackIndex(prev)
        : (prev - 1 + playlist.length) % playlist.length
    );
    setIsPlaying(true);
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  const current = playlist[currentTrack];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div
            className="w-64 h-64 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-1">{current.title}</h3>
            <p className="text-muted-foreground">{current.artist}</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-colors ${
              isShuffle ? "text-primary" : "hover:text-primary"
            }`}
          >
            <Shuffle className="w-5 h-5" />
          </button>
          <button
            onClick={handlePrevious}
            className="hover:text-primary transition-colors"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            )}
          </button>
          <button
            onClick={handleNext}
            className="hover:text-primary transition-colors"
          >
            <SkipForward className="w-6 h-6" />
          </button>
          <button
            onClick={() =>
              setRepeatMode(
                repeatMode === "off"
                  ? "all"
                  : repeatMode === "all"
                  ? "one"
                  : "off"
              )
            }
            className={`transition-colors ${
              repeatMode !== "off" ? "text-primary" : "hover:text-primary"
            }`}
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
          <span className="text-sm text-muted-foreground w-8">{volume}</span>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-semibold mb-2">Queue</div>
          {playlist.map((song, index) => (
            <button
              key={index}
              onClick={() => handleTrackClick(index)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                index === currentTrack
                  ? "bg-primary/20"
                  : "hover:bg-secondary/50"
              }`}
            >
              <div className="w-10 h-10 rounded bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                {index === currentTrack && isPlaying && (
                  <div className="flex gap-0.5 items-end h-4">
                    <div
                      className="w-1 bg-white animate-pulse"
                      style={{ height: "60%" }}
                    />
                    <div
                      className="w-1 bg-white animate-pulse"
                      style={{ height: "100%", animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-1 bg-white animate-pulse"
                      style={{ height: "80%", animationDelay: "0.4s" }}
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 text-left">
                <div
                  className={`text-sm font-medium ${
                    index === currentTrack ? "text-primary" : ""
                  }`}
                >
                  {song.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {song.artist}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {song.duration}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
