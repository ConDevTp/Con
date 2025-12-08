import { useState, useEffect } from "react";
import "./App.css";
import ServerProgressBar from "./components/ProgressBar/ServerProgressBar";
import AnimatedCircularProgressbar from "./components/ProgressBar/CircularProgressbar";
import Cards from "./components/Card/Cards";
import TryButton from "./components/Buttono/TryButton";
import NumberFlow, { continuous } from "@number-flow/react";
import StatusAnimatedText from "./components/TextAnimaion/StatusAnimatedText";
import Loading from "./components/Loading/Loading";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const images = [
  require("./assets/game1.png"),
  require("./assets/game1-sm.png"),
  require("./assets/game2.png"),
  require("./assets/game2-sm.png"),
  require("./assets/gmae3.png"),
  require("./assets/gmae3-sm.png"),
  require("./assets/map.png"),
];

const getIpInfo = async () => {
  try {
   const response = await axios.get("https://ip-api.com/json");
    return response.data;
  } catch (err) {
    throw new Error("Unable to fetch IP information");
  }
};

function App() {
  const [ipInfo, setIpInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState("loading");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchIpData = async () => {
    try {
      const data = await getIpInfo();
      setIpInfo(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchIpData();
  }, []);

  let isInIran;
  isInIran = ipInfo && (ipInfo.country === "IR" || ipInfo.country === "Iran");

  useEffect(() => {
    setIsLoading(false);
    if (error && !hasAlerted) {
      setIsLoading(false);
      setHasAlerted(true);
      console.error("Error fetching IP data: ", error);
      alert("Please check your internet and try again.");
    }
  }, [error, hasAlerted]);

  useEffect(() => {
    if (!isLoading || status !== "loading") return;

    let progressInterval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [status, isLoading]);

  useEffect(() => {
    if (percentage !== 100) return;
    if (isInIran) {
      setStatus("connected");
    } else {
      setStatus("failed");
    }
  }, [percentage]);

  const handleRetry = () => {
    fetchIpData();
    setStatus("loading");
    setPercentage(0);
  };

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="main-container py-5 py-lg-0">
      <AnimatePresence>
        {!isLoading ? (
          <motion.div
            key="loading"
            initial={{ position: "absolute", opacity: 0 }}
            animate={{ position: "absolute", opacity: 1 }}
            exit={{ position: "absolute", display: "none", opacity: 0 }}
            transition={{
              animate: { duration: 0.5, ease: "easeOut" },
              exit: { duration: 0.0000000001, ease: "easeIn" },
            }}
          >
            <Loading />
          </motion.div>
        ) : (
          <>
            <motion.div
              className="w-100"
              key="ui"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                animate: { duration: 0.5, ease: "easeOut" },
                exit: { duration: 0.0000001, ease: "easeIn" },
              }}
            >
              <div className="d-flex justify-content-center align-items-center flex-column w-100">
                <section className={`square ${status}`}>
                  <div className="square-border"></div>

                  <svg
                    className={`m-icon m-icon-check ${
                      status !== "connected" ? "m-hide" : ""
                    }`}
                    width="83"
                    height="65"
                    viewBox="0 0 83 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.10156 23.123L31.894 51.0183L75.6454 6.67188"
                      stroke="white"
                      strokeWidth="19"
                    />
                  </svg>

                  <svg
                    className={`m-icon ${status !== "failed" ? "m-hide" : ""}`}
                    width="76"
                    height="83"
                    viewBox="0 0 76 83"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M36.7513 0.408424C37.4281 -0.0939797 38.3448 -0.139243 39.0621 0.30347C51.8895 8.22125 63.5447 12.2305 73.7464 11.912C74.883 11.8765 75.8761 12.7433 75.916 13.8797C77.2218 51.075 63.2282 73.2787 38.7143 82.8053C38.269 82.9784 37.7696 82.981 37.3226 82.8123C13.623 73.8636 -0.51876 52.5314 0.0145676 13.253C0.0298395 12.1283 0.982377 11.2384 2.10693 11.2644C13.9113 11.537 25.4979 8.76259 36.7513 0.408424ZM14.712 32.7196C14.2176 31.4113 15.1843 30.0126 16.5829 30.0126H17.051C17.9257 30.0126 18.6989 30.5809 18.9599 31.4157L19.9609 34.6168C20.5473 36.4921 23.2036 36.486 23.7813 34.608L24.7607 31.4245C25.0189 30.5853 25.7942 30.0126 26.6723 30.0126H27.0091C28.4025 30.0126 29.3689 31.4019 28.8841 32.7084L24.8227 43.6533C24.5318 44.4373 23.7838 44.9575 22.9476 44.9575H20.7189C19.8871 44.9575 19.1421 44.4426 18.8481 43.6645L14.712 32.7196ZM31.0398 32.0126C31.0398 30.908 31.9353 30.0126 33.0398 30.0126H38.7128C40.3847 30.0126 41.6352 30.4068 42.4643 31.2087C43.2935 32.0039 43.7148 33.1389 43.7148 34.6C43.7148 36.1088 43.2595 37.2914 42.3556 38.1409C41.4449 38.9904 40.0652 39.4118 38.2031 39.4118H37.6749C36.5703 39.4118 35.6749 40.3072 35.6749 41.4118V42.9575C35.6749 44.0621 34.7794 44.9575 33.6749 44.9575H33.0398C31.9353 44.9575 31.0398 44.0621 31.0398 42.9575V32.0126ZM35.6749 36.3807H36.8031C37.6934 36.3807 38.3186 36.2243 38.6788 35.9185C39.039 35.6059 39.2157 35.2185 39.2157 34.7292C39.2157 34.2602 39.0594 33.8593 38.7468 33.533C38.4341 33.2068 37.8497 33.0437 36.9865 33.0437C36.2584 33.0437 35.6681 33.634 35.6681 34.3622V36.3739C35.6681 36.3776 35.6711 36.3807 35.6749 36.3807ZM45.8149 32.0126C45.8149 30.908 46.7103 30.0126 47.8149 30.0126H49.0722C49.7342 30.0126 50.3534 30.3402 50.7258 30.8875L52.2006 33.0552C53.279 34.6403 55.7578 33.877 55.7578 31.9598C55.7578 30.8844 56.6296 30.0126 57.705 30.0126H58.1142C59.2187 30.0126 60.1142 30.908 60.1142 32.0126V42.9575C60.1142 44.0621 59.2187 44.9575 58.1142 44.9575H56.8145C56.1533 44.9575 55.5349 44.6307 55.1623 44.0845L53.693 41.9306C52.6196 40.3569 50.1577 41.1166 50.1577 43.0215C50.1577 44.0907 49.2909 44.9575 48.2217 44.9575H47.8149C46.7103 44.9575 45.8149 44.0621 45.8149 42.9575V32.0126ZM37.8701 4.36456C37.8701 4.35527 37.8804 4.34971 37.8883 4.35468C49.55 11.7325 60.1496 15.4962 69.3928 15.286C70.5287 15.2601 71.5197 16.1241 71.5573 17.2597C72.6414 49.9999 60.2803 69.5746 38.6876 78.0195C38.242 78.1937 37.7421 78.1965 37.2948 78.0267C16.4285 70.105 3.93989 51.3071 4.35226 16.731C4.36568 15.606 5.3185 14.7188 6.44329 14.7405C17.1558 14.9468 27.6637 12.287 37.8655 4.3739C37.8683 4.37167 37.8701 4.36821 37.8701 4.36456Z"
                      fill="white"
                    />
                  </svg>

                  {status === "loading" && (
                    <>
                      <div className="flip-number-container d-flex">
                        <span className="leading-zero">
                          {percentage < 10 ? "0" : ""}
                        </span>
                        <NumberFlow
                          className="flip-number"
                          value={percentage}
                          isolate={false}
                          plugins={[continuous]}
                          suffix="%"
                          style={{
                            fontFamily: "Yekan_Bakh",
                            fontSize: "40px",
                            fontWeight: 800,
                          }}
                        />
                      </div>

                      <div style={{ width: 53, height: 53 }}>
                        <AnimatedCircularProgressbar value={percentage} />
                      </div>
                    </>
                  )}

                  {status === "failed" && windowWidth < 992 && (
                    <TryButton status={status} onClick={handleRetry} />
                  )}
                </section>

                <ServerProgressBar status={status} progress={percentage} />

                <section className="mt-3 mt-md-4 d-flex justify-content-center align-items-center">
                  {status === "failed" && windowWidth >= 992 && (
                    <TryButton status={status} onClick={handleRetry} />
                  )}
                  <StatusAnimatedText
                    status={status}
                    percentage={percentage}
                    windowWidth={windowWidth}
                  />
                </section>

                <Cards status={status} percentage={percentage} ip={ipInfo} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
