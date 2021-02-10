const getDataFromLocalStorage = (key: string) => {
  const keyValue = localStorage.getItem(key);
  return keyValue ? JSON.parse(keyValue) : null;
};

const setDataToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getDataFromLocalStorage, setDataToLocalStorage };
