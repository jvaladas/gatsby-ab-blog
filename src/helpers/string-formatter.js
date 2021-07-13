export const shortenString = (value, limit = 55) => {
  if (value?.length > limit) {
    return (value.substring(0, limit) + '...');
  }
  return value;
};
