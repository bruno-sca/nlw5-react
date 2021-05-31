import { useContext } from "react";
import { PlayerContext, PlayerContextType } from "../providers/playerControls";

const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayer must be used within an PlayerProvider");

  return context;
};

export default usePlayer;
