export const truncateText = (str: string) => {
  return str.length < 25 ? str : str.substring(0, 25) + '...';
};
