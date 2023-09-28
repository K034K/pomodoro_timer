(() => {
  // src/utility/api.js
  function notification(message) {
    browser.notifications.create({
      type: "basic",
      iconUrl: browser.extension.getURL(
        "icons/pomodoro-48.png"
      ),
      title: "Pomodoro Timer",
      message
    });
  }

  // src/background.js
  var BackgroundTimer = class {
    /**
     * Creates a new instance of the BackgroundTimer class.
     * @param {Object} props - The properties to initialize the timer with.
     * @param {number} props.minutes - The number of minutes for the timer.
     * @param {number} props.seconds - The number of seconds for the timer.
     * @param {boolean} props.timerOn - Whether the timer is currently running.
     */
    constructor(props) {
      this.timeMinutes = props.minutes || 0;
      this.timeSeconds = props.seconds || 0;
      this.startMinutes = props.minutes || 0;
      this.startSeconds = props.seconds || 0;
      this.breakTimeMinutes = props.breakMinutes || 0;
      this.breakTimeSeconds = props.breakSeconds || 0;
      this.timerOn = props.timerOn || false;
      this.interval = null;
      this.timerMode = "work";
    }
    /**
     * Gets the current time of the timer.
     * @returns {string} The current time of the timer in the format "mm:ss".
     */
    getTime() {
      return "".concat(this.timeMinutes, ":").concat(this.timeSeconds < 10 ? "0".concat(this.timeSeconds) : this.timeSeconds);
    }
    /**
     * Starts the timer.
     */
    startTimer() {
      console.log("startTimer");
      if (this.timerOn) {
        return;
      }
      this.timerOn = true;
      this.interval = setInterval(() => {
        if (this.timeSeconds > 0) {
          this.timeSeconds--;
        }
        if (this.timeSeconds === 0) {
          if (this.timeMinutes === 0) {
            if (this.timerMode === "work") {
              notification("Break Time!");
              this.timeMinutes = this.breakTimeMinutes;
              this.timeSeconds = this.breakTimeSeconds;
            } else {
              notification("Work Time!");
              this.timeMinutes = this.startMinutes;
              this.timeSeconds = this.startSeconds;
            }
            this.timerMode = this.timerMode === "work" ? "break" : "work";
          } else {
            this.timeMinutes--;
            this.timeSeconds = 59;
          }
        }
      }, 1e3);
    }
    /**
     * Stops the timer.
     */
    stopTimer() {
      console.log("stopTimer");
      this.timerOn = false;
      clearInterval(this.interval);
    }
    /**
     * Resets the timer to its initial state.
     * @param {Object} props - The properties to reset the timer with.
     * @param {number} props.minutes - The number of minutes for the timer.
     * @param {number} props.seconds - The number of seconds for the timer.
     */
    resetTimer() {
      console.log("resetTimer");
      this.timeMinutes = this.startMinutes;
      this.timeSeconds = this.startSeconds;
      this.timerMode = "work";
      this.stopTimer();
    }
  };
  var backgroundTimer = new BackgroundTimer({ minutes: 25, seconds: 0 });
  function initializeTimer() {
    browser.storage.sync.get(["workTime", "breakTime"]).then((result) => {
      backgroundTimer.startMinutes = result.workTime;
      backgroundTimer.timeMinutes = result.workTime;
      backgroundTimer.breakTimeMinutes = result.breakTime;
    });
  }
  initializeTimer();
  function listenerBackground(message, sender, sendResponse) {
    if (message.type === "getTimer") {
      sendResponse({ time: backgroundTimer.getTime() });
    } else if (message.type === "startTimer") {
      backgroundTimer.startTimer();
    } else if (message.type === "stopTimer") {
      backgroundTimer.stopTimer();
    } else if (message.type === "resetTimer") {
      backgroundTimer.resetTimer();
    } else if (message.type === "updateTime") {
      backgroundTimer.startMinutes = message.minutes;
      backgroundTimer.startSeconds = 0;
      backgroundTimer.timeMinutes = message.minutes;
      backgroundTimer.timeSeconds = 0;
      backgroundTimer.resetTimer();
    }
  }
  browser.runtime.onMessage.addListener(listenerBackground);
})();
