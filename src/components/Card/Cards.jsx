import { FaAngleLeft } from "react-icons/fa6";
import "./cards.css";

const Cards = ({ status, ip }) => {
  return (
    <section className="mt-4 pt-2 d-flex flex-column-reverse flex-lg-row justify-content-center align-items-center w-100">
      <div className="box box-map d-flex justify-content-center align-items-center">
        <img
          src={require("../../assets/map.png")}
          className="img-fluid rounded-top"
          alt="Map"
        />
        <span className="map-dot dot-1"></span>
        <span className="map-dot dot-2"></span>
        <span className="map-dot dot-3"></span>
        <span className="map-dot dot-4"></span>
        <span className="map-dot dot-5"></span>
      </div>

      <div className="box d-flex justify-content-center align-items-start flex-column position-relative">
        <div className="d-flex justify-content-center align-items-center flex-column con-text-ip">
          <h3>آیپی دستگاه شما</h3>
          <div className="d-flex justify-content-center align-content-center con-ip-text">
            {status === "failed" ? (
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 13.5042C8.5 11.0034 11 8.764 11 6.00168C11 3.23933 8.76143 1 6 1C3.23858 1 1 3.23933 1 6.00168C1 8.764 3.5 11.0034 6 13.5042Z"
                  stroke="#FF1164"
                  stroke-opacity="0.3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.99987 7.25212C6.75706 7.25212 7.37084 6.65518 7.37084 5.91878C7.37084 5.1824 6.75706 4.58545 5.99987 4.58545C5.24269 4.58545 4.62891 5.1824 4.62891 5.91878C4.62891 6.65518 5.24269 7.25212 5.99987 7.25212Z"
                  stroke="#FF1164"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 13.5042C8.5 11.0034 11 8.764 11 6.00168C11 3.23933 8.76143 1 6 1C3.23858 1 1 3.23933 1 6.00168C1 8.764 3.5 11.0034 6 13.5042Z"
                  stroke="#11FF98"
                  stroke-opacity="0.3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.00036 7.25212C6.75755 7.25212 7.37133 6.65518 7.37133 5.91878C7.37133 5.1824 6.75755 4.58545 6.00036 4.58545C5.24318 4.58545 4.62939 5.1824 4.62939 5.91878C4.62939 6.65518 5.24318 7.25212 6.00036 7.25212Z"
                  stroke="#11FF98"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}

            <h4 className={status === "failed" ? "failed-text" : ""}>
              {ip ? ip.query : "لودینگ ..."}
            </h4>
          </div>
          <h5
            className={
              status === "loading"
                ? "loading-circle"
                : status === "connected"
                ? "connected-circle"
                : "failed-circle"
            }
          >
            {status === "loading" && "۸ ms"}
            {status === "connected" && "۲۴۰ ms"}
            {status === "failed" && "۲۷۰ ms"}
          </h5>
        </div>

        <div className="con-games">
          <div className="game-1">
            <img
              src={require("../../assets/game1.png")}
              alt="Game-1"
              className="game-lg"
            />
            <img
              src={require("../../assets/game1-sm.png")}
              alt="Game-1"
              className="game-sm"
            />
          </div>

          <div className="game-2">
            <img
              src={require("../../assets/game2.png")}
              alt="Game-2"
              className="game-lg"
            />
            <img
              src={require("../../assets/game2-sm.png")}
              alt="Game-2"
              className="game-sm"
            />
          </div>

          <div className="game-3">
            <img
              src={require("../../assets/gmae3.png")}
              alt="Game-3"
              className="game-lg"
            />
            <img
              src={require("../../assets/gmae3-sm.png")}
              alt="Game-3"
              className="game-sm"
            />
          </div>

          <a href="/Your_Web_Link">
            <button className="game-button d-flex justify-content-center align-items-center">
              <span>
                <FaAngleLeft />
              </span>
              لیست بازی ها
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cards;
