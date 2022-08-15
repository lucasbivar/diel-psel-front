const zeroPad = (num, places) => String(num).padStart(places, '0');

export const formatTime = (dateTime) => {
  const date = new Date(dateTime);
  const timeToString = `${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`;
  return timeToString;
};

export const formatDate = (dateTime) => {
  const date = new Date(dateTime);

  const dateToString = `${
    zeroPad(date.getDate(), 2)
  }-${zeroPad(date.getMonth() + 1, 2)}-${date.getFullYear()}`;

  return dateToString;
};
