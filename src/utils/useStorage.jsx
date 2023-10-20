import { useState, useEffect } from 'react';

function useStorage({ key, initValue, initFunc, storageObject }) {
  const [value, setValue] = useState(() => {
    const jsonString = storageObject.getItem(key);
    if (jsonString != null) return JSON.parse(jsonString);

    return initFunc?.() || initValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);

    return storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  return [value, setValue];
}

export function useLocalStorage({ key, initValue, initFunc }) {
  return useStorage({
    key,
    initValue,
    initFunc,
    storageObject: window.localStorage,
  });
}

export function useSessionStorage({ key, initValue, initFunc }) {
  return useStorage({
    key,
    initValue,
    initFunc,
    storageObject: window.sessionStorage,
  });
}
