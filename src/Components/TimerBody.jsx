//making pomdoro timer with react
//use state to keep track of time

//on click "start" start timer
//on click "stop" stop timer
//on click "reset" reset timer

// start time will tick up to 0

import React, { useEffect, useState } from "react";
import { startTimer, stopTimer, resetTimer, getTimer } from "../utility/api";

export default function TimerBody() {
    const [timer, setTimer] = useState(null);

    getTimer().then((data) => {
        setTimer(data);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            getTimer().then((data) => {
                setTimer(data);
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);
 
    return (
        <div className="timerBody">
            <h1>Timer</h1>
            <h2>{timer}</h2>
            <button
                className="button"
                onClick={() => {
                    void startTimer();
                }}
            >
                Start
            </button>
            <button
                className="button"
                onClick={() => {
                    void stopTimer();
                }}
            >
                Stop
            </button>
            <button
                className="button"
                onClick={() => {
                    resetTimer();
                }}
            >
                Reset
            </button>
            
        </div>
    );
}
