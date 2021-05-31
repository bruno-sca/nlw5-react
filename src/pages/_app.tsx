import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerContextProvider } from "../shared/providers/playerControls";

import styles from "../styles/app.module.scss";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <PlayerContextProvider>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </PlayerContextProvider>
    </div>
  );
}

export default MyApp;
