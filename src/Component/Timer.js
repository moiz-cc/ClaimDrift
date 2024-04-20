import { useEffect, useState } from "react";

const Timer = ({ isTimerOff }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = new Date("2024-1-22 17:00:00Z").toUTCString();

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));

    if (Date.now() > Date.parse(deadline)) {
      isTimerOff(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className=" h- position-absolute rounded-4 d-flex flex-column justify-content-center align-items-center "
        style={{ zIndex: 9999 }}
      >
        <h4
          className="DTSC_Heading text-white fw-bolder text-center m-0 mb-3 p-0 text-uppercase"
          style={{
            fontSize: "2em",
          }}
        >
          PRESALE LAP 2 <br />
          Opening...
        </h4>

        <div className="d-flex  justify-content-center align-items-center  flex-sm-row d-sm-flex">
          <div className=" p-0 pe-2 pe-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p id="day" className="DTSC_Heading m-0 text-white">
                {days < 10 ? "0" + days : days}
              </p>

              <span className="text-white ">Days</span>
            </div>
          </div>
          <span className="fw-bolder text-white fs-1">:</span>
          <div className=" p-0 px-2 px-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p id="hour" className="DTSC_Heading m-0 text-white">
                {hours < 10 ? "0" + hours : hours}
              </p>
              <span className="text-white ">Hours</span>
            </div>
          </div>
          <span className="fw-bolder text-white fs-1">:</span>

          <div className=" p-0 px-2 px-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p id="minute" className="DTSC_Heading m-0 text-white">
                {minutes < 10 ? "0" + minutes : minutes}
              </p>
              <span className="text-white ">Minutes</span>
            </div>
          </div>
          <span className="fw-bolder text-white fs-1">:</span>

          <div className=" p-0 ps-2 ps-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p id="second" className="DTSC_Heading m-0 text-white">
                {seconds < 10 ? "0" + seconds : seconds}
              </p>
              <span className="text-white ">Seconds</span>
            </div>
          </div>
        </div>
        <p className="Deadline m-0 mt-3 text-center text-white">
          22 January 12pm EST
        </p>
      </div>
    </>
  );
};
export default Timer;
