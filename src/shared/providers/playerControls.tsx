import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { shuffleArray } from "../helpers/arrayShuffle";

type PlayerContextProviderProps = {
  children: ReactNode;
};

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

export type PlayerContextType = {
  data: {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
  };
  actions: {
    clearPlayer(): void;
    changeEpisode(episodesNumber: number): void;
    play(episode: Episode): void;
    playPlaylist(playlist: Episode[], index: number): void;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    togglePause(): void;
    toggleLoop(): void;
    toggleShuffle(): void;
  };
};

export const PlayerContext = createContext<PlayerContextType>({
  data: {
    episodeList: [],
    currentEpisodeIndex: 0,
    isPlaying: false,
    isLooping: false,
    isShuffling: false,
  },
  actions: {
    clearPlayer: () => null,
    changeEpisode: () => null,
    play: () => null,
    playPlaylist: () => null,
    setIsPlaying: () => null,
    togglePause: () => null,
    toggleLoop: () => null,
    toggleShuffle: () => null,
  },
});

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function clearPlayer() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
    setIsShuffling(false);
    setIsLooping(false);
  }

  function playPlaylist(playlist: Episode[], index: number) {
    setEpisodeList(playlist);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
    setIsShuffling(false);
    setIsLooping(false);
  }

  function togglePause() {
    setIsPlaying((prevState) => !prevState);
  }

  function toggleLoop() {
    setIsLooping((prevState) => !prevState);
  }

  function toggleShuffle() {
    setIsShuffling((prevState) => !prevState);
  }

  function changeEpisode(episodesNumber: number) {
    let newEpisodeIndex = currentEpisodeIndex + episodesNumber;
    if (isShuffling) {
      newEpisodeIndex = Math.floor(Math.random() * episodeList.length);
    }

    if (newEpisodeIndex >= 0 || newEpisodeIndex <= episodeList.length) {
      setCurrentEpisodeIndex(newEpisodeIndex);
      setIsPlaying(true);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        data: {
          isLooping,
          isShuffling,
          isPlaying,
          episodeList,
          currentEpisodeIndex,
        },
        actions: {
          clearPlayer,
          changeEpisode,
          play,
          playPlaylist,
          setIsPlaying,
          togglePause,
          toggleLoop,
          toggleShuffle,
        },
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
