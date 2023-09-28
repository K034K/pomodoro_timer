
import React, { useEffect, useState } from "react";
import { startTimer, stopTimer, resetTimer, getTimer } from "../utility/api";

/**
 * TimerBody component that displays the timer and buttons to control it.
 * @returns {JSX.Element} The TimerBody component.
 */
export default function TimerBody() {
    const [timer, setTimer] = useState(null);

    getTimer().then((data) => {
        setTimer(data);
    });

    useEffect(() => {
        /**
         * Sets an interval to update the timer every 500ms by calling the getTimer function and updating the state with the returned data.
         */
        const interval = setInterval(() => {
            getTimer().then((data) => {
                setTimer(data);
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timerBody pure-form pure-form-stacked">
            <div className="pure-u-1 time-container">
                <h2 className="time">{timer}</h2>
            </div>
            <button
                className="pure-button pure-button-primary pure-u-1"
                onClick={() => {
                    void startTimer();
                }}
            >
                Start
            </button>
            <button
                className="pure-button  pure-u-1"
                onClick={() => {
                    void stopTimer();
                }}
            >
                Stop
            </button>
            <button
                className="pure-button pure-u-1"
                onClick={() => {
                    resetTimer();
                }}
            >
                Reset
            </button>
        </div>
    );
}
