import React from "react";

import TimerBody from "./Components/TimerBody";

export default function App(props) {
    const openOptions = () => {
        browser.runtime.openOptionsPage();
    };

    return (
        <div>
            <button
                className="button-xsmall pure-button"
                onClick={() => openOptions()}>Options</button>
            <TimerBody />
        </div>
    );
}
