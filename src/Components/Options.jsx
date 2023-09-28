import React, { useEffect, useState } from "react";

/**
 * Options component that allows the user to set and save the work and break times.
 * @param {Object} props - React props object
 * @returns {JSX.Element} - Options component UI
 */
export default function Options(props) {
    const [workTime, setWorkTime] = useState("25");
    const [breakTime, setBreakTime] = useState("5");

    /**
     * Saves the work and break times to browser storage and sends a message to the runtime to update the time.
     */
    const saveTime = () => {
        browser.storage.sync.set({
            workTime: workTime,
            breakTime: breakTime,
        });

        browser.runtime.sendMessage({
            type: "updateTime",
            minutes: workTime,
            breakTime: breakTime,
        });
    };

    /**
     * Gets the work and break times from browser storage and sets the state.
     */
    const getTime = () => {
        browser.storage.sync.get(["workTime", "breakTime"]).then((result) => {
            setWorkTime(result.workTime);
            setBreakTime(result.breakTime);
        });
    };

    useEffect(() => {
        getTime();
    }, []);

    /**
     * Handles changes to the work time input field and updates the state.
     * @param {Object} event - Input change event object
     */
    const handleWorkTimeChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setWorkTime(value);
        }
    };

    /**
     * Handles changes to the break time input field and updates the state.
     * @param {Object} event - Input change event object
     */
    const handleBreakTimeChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setBreakTime(value);
        }
    };

    return (
        <div className="container options">
            <form className="pure-form pure-form-stacked">
                <div className="workingTime pure-control-group">
                    <label htmlFor="workingTime">Working Time</label>
                    <input
                        type="number"
                        value={workTime}
                        onChange={handleWorkTimeChange}
                        className="pure-u-1"
                        min="0"
                    />
                </div>
                <div className="breakTime pure-control-group">
                    <label htmlFor="breakTime">Break Time</label>
                    <input
                        type="number"
                        value={breakTime}
                        onChange={handleBreakTimeChange}
                        className="pure-u-1"
                        min="0"
                    />
                </div>
                <button
                    onClick={() => saveTime()}
                    className="pure-button pure-button-primary pure-u-1"
                >
                    Save
                </button>
            </form>
            
            <a href="https://www.buymeacoffee.com/mrynskyiwk" className="buy-me-coffee">
                <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=mrynskyiwk&button_colour=5F7FFF&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" />
                </a>
            
        </div>
    );
}
