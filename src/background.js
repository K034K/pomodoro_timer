import { useEffect, useState } from "react";

function background(props) {
    [minutes, seconds] = props;

    const [timeMinutes, setTimeMinutes] = useState(minutes || 25);

    const [timeSeconds, setTimeSeconds] = useState(seconds || 0);

    const [timerOn, setTimerOn] = useState(props.timerOn || false);

    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                if (timeSeconds === 0) {
                    if (timeMinutes !== 0) {
                        setTimeMinutes((prev) => prev - 1);
                        setTimeSeconds(59);
                    } else {
                        clearInterval(interval);
                        setTimerOn(false);
                    }
                } else {
                    setTimeSeconds((prev) => prev - 1);
                }
            }, 1000);
        } else if (!timerOn && timeSeconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn, timeSeconds]);

    function getTime() {
        return `${timeMinutes}:${
            timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds
        }`;
    }

    function StartTimer() {
        setTimerOn(true);
    }

    function StopTimer() {
        setTimerOn(false);
    }

    function ResetTimer() {
        setTimeMinutes(minutes || 15);
        setTimeSeconds(seconds || 0);
        setTimerOn(false);
    }

    return null;
}

export { StartTimer, StopTimer, ResetTimer, getTime };
