export const truncateText = (str: string, length: number) => {
  return str.length < length ? str : str.substring(0, length) + '...';
};
