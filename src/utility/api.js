/**
 * Sends a message to start the timer.
 * @function
 * @returns {void}
 */
export function startTimer() {
    browser.runtime.sendMessage({ type: "startTimer" });
}

/**
 * Sends a message to stop the timer.
 * @function
 * @returns {void}
 */
export function stopTimer() {
    browser.runtime.sendMessage({ type: "stopTimer" });
}

/**
 * Sends a message to reset the timer.
 * @function
 * @returns {void}
 */
export function resetTimer() {
    browser.runtime.sendMessage({ type: "resetTimer" });
}

/**
 * Sends a message to get the current timer value.
 * @function
 * @returns {Promise<number>} A promise that resolves with the current timer value.
 */
export function getTimer() {
    return new Promise((resolve, reject) => {
        browser.runtime.sendMessage({ type: "getTimer" }).then((response) => {
            resolve(response.time);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function notification(message) { 
    browser.notifications.create({
        type: "basic",
        iconUrl: browser.extension.getURL(
            "icons/pomodoro-48.png"
        ),
        title: "Pomodoro Timer",
        message: message,
    });

}
