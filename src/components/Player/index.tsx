import Image from "next/image";
import Slider from "rc-slider";
import { useEffect, useRef, useState } from "react";

import "rc-slider/assets/index.css";

import { usePlayer } from "../../shared/hooks";
import styles from "./styles.module.scss";
import { convertSecondsToTimeString } from "../../utils/convertSecondsToTimeString";

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    data: {
      isLooping,
      isPlaying,
      isShuffling,
      episodeList,
      currentEpisodeIndex,
    },
    actions: {
      clearPlayer,
      changeEpisode,
      setIsPlaying,
      togglePause,
      toggleLoop,
      toggleShuffle,
    },
  } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) return;

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    console.log(episodeList);
  }, [episodeList]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleEpisodeEnd() {
    if (currentEpisodeIndex + 1 <= episodeList.length) {
      changeEpisode(1);
    } else {
      clearPlayer();
    }
  }

  function handleEpisoteTimeChange(newTime: number) {
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  }

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando Agora" />
        <strong>Tocando Agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>{convertSecondsToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                onChange={handleEpisoteTimeChange}
                value={progress}
                max={episode.duration}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertSecondsToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={setupProgressListener}
            onEnded={handleEpisodeEnd}
            autoPlay
          />
        )}

        <div className={styles.buttons}>
          <button
            className={isShuffling ? styles.isActive : ""}
            type="button"
            disabled={!episode || episodeList.length < 2}
            onClick={toggleShuffle}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            type="button"
            disabled={!episode || currentEpisodeIndex - 1 < 0}
            onClick={() => changeEpisode(-1)}
          >
            <img src="/play-previous.svg" alt="Tocar Anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            onClick={togglePause}
            disabled={!episode}
          >
            <img src={isPlaying ? "/pause.svg" : "/play.svg"} alt="Tocar" />
          </button>
          <button
            type="button"
            disabled={!episode || currentEpisodeIndex + 1 > episodeList.length}
          >
            <img
              src="/play-next.svg"
              alt="Tocar Próxima"
              onClick={() => changeEpisode(1)}
            />
          </button>
          <button
            className={isLooping ? styles.isActive : ""}
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
