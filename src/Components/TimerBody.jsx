
//making pomdoro timer with react
//use state to keep track of time

//on click "start" start timer
//on click "stop" stop timer
//on click "reset" reset timer

// start time will tick up to 0 

import React, { useEffect, useState } from "react";

import {getTime , StartTimer, StopTimer, ResetTimer} from "../background";

export default function TimerBody(props) {
    const time = 15;

    const [timeMinutes, setTimeMinutes] = useState(time);

    const [timeSeconds, setTimeSeconds] = useState(0);
    



    return (
        <div>
            <h1>Timer</h1>
            <h2>{getTime}</h2>
            <button className="button" onClick={StartTimer}>
                Start
            </button>
            <button className="button" onClick={StopTimer}>
                Stop
            </button>
            <button className="button" onClick={ResetTimer}>
                Reset
            </button>
        </div>
    );
}
