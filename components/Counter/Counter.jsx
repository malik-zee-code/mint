import { useState, useEffect, useContext } from "react";
import { getRemainingTimeUntilMsTimestamp } from "./utils/CountdownTimerUtils";
import { SetTimerContext } from "./CounterCountext";
import Skeleton from "@mui/material/Skeleton";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

export const CountdownTimer = ({ countdownTimestampMs, finish }) => {
  // const finishing = finish * 24 * 60 * 60 * 1000
  countdownTimestampMs = countdownTimestampMs;
  const [end, setEnd] = useState(false);
  const [real_end, setRealEnd] = useState(false);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [loading, setshowloading] = useState();
  const set_timer = useContext(SetTimerContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  useEffect(() => {
    setshowloading(true);

    const time = setTimeout(() => {
      setshowloading(false);
    }, 2000);

    return () => {
      time;
    };
  }, []);

  function updateRemainingTime(countdown) {
    if (Date.now() > countdownTimestampMs + finish) {
      setRealEnd(true);
    }
    else
     if (
      getRemainingTimeUntilMsTimestamp(countdown).days == "00" &&
      getRemainingTimeUntilMsTimestamp(countdown).seconds == "00" &&
      getRemainingTimeUntilMsTimestamp(countdown).hours == "00" &&
      getRemainingTimeUntilMsTimestamp(countdown).minutes == "00"
    ) {
      set_timer(true);
      setEnd(true);
    } else {
      setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }
  }

  return (
    <div>
      {!loading ? (
        !real_end ?
        !end ?
         (
          <div className="flex items-center text-xs montnormal font-semibold">
            {/* <span>{remainingTime.days}</span> */}
            {/* <span>::</span> */}
            {/* <div onClick={() => 
       { set_timer()
        (timer)}
        }> timer </div> */}
            Launches in
            <div className="mx-[2px]">{remainingTime.hours}h</div>
            <div className="mx-[2px]">:</div>
            <div className="mx-[2px]">{remainingTime.minutes}m</div>
            <div className="mx-[2px]">:</div>
            <div className="mx-[2px] w-[21.6px]">{remainingTime.seconds}s</div>
            {/* <div></div> */}
          </div>
        ) : (
          <div className="montnormal font-semibold">LIVE</div>
        )
        :
        <div className="montnormal font-semibold">END</div>
      )
       : (
        <>
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.880" }}
            animation="pulse"
            width={125}
            height={20}
            className="rounded-full"
          />
        </>
      )}
    </div>
  );
};
