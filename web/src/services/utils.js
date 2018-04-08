export function secondsToText(totalSeconds) {
  function numberEnding (number) {
    return (number > 1) ? 's' : '';
  }

  let seconds = totalSeconds % 60;
  let minutes = ~~(totalSeconds / 60);
  let hours = ~~(totalSeconds / 3600);

  seconds = seconds > 0 ? `${seconds} second${numberEnding(seconds)}` : "";
  minutes = minutes > 0 ? `${minutes} minute${numberEnding(minutes)}` : "";
  hours = hours > 0 ? `${hours} hour${numberEnding(hours)}` : "";

  return `${hours} ${minutes} ${seconds}`;
}
