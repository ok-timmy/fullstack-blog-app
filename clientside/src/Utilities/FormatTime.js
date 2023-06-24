import dateFormat from "dateformat"
export function calcTime(pubTime) {
  const currentTime = Date.now();
  const blogPubTime = new Date(pubTime);

  const timeDiff = (currentTime - blogPubTime) / (60 * 60 * 1000);

  //Check if time is less than one hour
  if (timeDiff < 1) {
    const minTime = Math.ceil(timeDiff * 60);
    return `${minTime} Minute${minTime > 1 ? "s" : ""} Ago`;
  }
  //Check if time is less than than a 24 hours
  else if (timeDiff <= 23) {
    const hourTime = Math.ceil(timeDiff);
    return `${hourTime} Hour${hourTime > 1 ? "s" : ""} Ago`;
  } else {
    const dayNumber = Math.floor(timeDiff / 24);

    if (dayNumber <= 7) {
      return `${dayNumber} Day${dayNumber > 1 ? "s" : ""} Ago`;
    } else {
      const returnDate = dateFormat(`${blogPubTime}`, "mmmm dS, yyyy")
      return `${returnDate}`;
    }
  }
}
