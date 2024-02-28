export const getTime = (dateString) => {
  const dateObject = new Date(dateString);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedTime;
};

export const getDiffTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    return formattedTime;
  } else if (diffInDays === 1) {
    return 'Kemarin';
  } else {
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}/${String(date.getFullYear()).slice(-2)}`;
    return formattedDate;
  }
};
