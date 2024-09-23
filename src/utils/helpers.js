export function getTimerData(timerData) {
  let minutes = Math.floor(timerData / 60);
  let seconds = timerData % 60;
  return { minutes, seconds };
}

export function convertTimeToSeconds(timerMinutes, timerSeconds) {
  return parseInt(timerMinutes, 10) * 60 + parseInt(timerSeconds, 10);
}
 
export function formatTime(timeValue) {
  return timeValue < 10 ? `0${timeValue}` : `${timeValue}`;
};

export function handleArrowKeyNavigation(e) {
  const inputs = Array.from(e.currentTarget.querySelectorAll("input"));
  const currentIndex = inputs.findIndex((input) => input === e.target);

  if (e.key === "ArrowLeft" && currentIndex > 0) {
    inputs[currentIndex - 1].select();
  } else if (e.key === "ArrowRight" && currentIndex < inputs.length - 1) {
    inputs[currentIndex + 1].select();
  } 
}