import React, { useEffect, useState } from "react";

export default function Options(props) {
    const [workTime, setWorkTime] = useState("25");
    const [breakTime, setBreakTime] = useState("5");

    const saveTime = () => {
        browser.storage.sync.set({
            workTime: workTime,
            breakTime: breakTime,
            
        });
        // console.log("workTime: " + workTime);
        // console.log("breakTime: " + breakTime);
        browser.runtime.sendMessage({ type: "updateTime", minutes: workTime, breakTime: breakTime });

        //browser.runtime.reload();
    };

    const getTime = () => {
        browser.storage.sync.get(["workTime", "breakTime"]).then((result) => {
            setWorkTime(result.workTime);
            setBreakTime(result.breakTime);
            // console.log(result);
        });
    };
    

    useEffect(() => {
        getTime();
       
    }, []);

    return (
        <div className="pure-form pure-form-aligned">
            <div className="workingTime pure-control-group">
                <label htmlFor="workingTime">Working Time</label>
                <input
                    type="number"
                    value={workTime}
                    onChange={(e) => setWorkTime(e.target.value)}
                />
            </div>
            <div className="breakTime pure-control-group">
                <label htmlFor="breakTime">Break Time</label>
                <input
                    type="number"
                    value={breakTime}
                    onChange={(e) => setBreakTime(e.target.value)}
                />
            </div>
            <button onClick={() => saveTime()}
            className="pure-button pure-button-primary"
            >Save</button>
        </div>
    );
}
