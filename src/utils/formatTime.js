export const getTime = (dateString) => {
  const dateObject = new Date(dateString);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedTime;
};
