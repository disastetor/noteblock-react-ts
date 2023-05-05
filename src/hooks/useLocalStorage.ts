import { useEffect, useState } from 'react';

export const useLocalStorage = <T>( //T is a generic type
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    //Function version of useState
    const jsonValue = localStorage.getItem(key); //Take the item with corresponding key from localstorage
    //Check if there is jsonValue or not
    if (jsonValue == null) {
      //Check if initialValue is a function or not
      if (typeof initialValue === 'function') {
        //If initialValue is a function run the function version
        return (initialValue as () => T)();
        //Else just return initialValue
      } else {
        return initialValue;
      }
    } else {
      //If there was something in localstorage returns it in json
      return JSON.parse(jsonValue);
    }
  });

  //Every time value or key changes, store the new data
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
};
