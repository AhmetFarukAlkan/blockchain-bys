import {useEffect, useState} from 'react';
import {getTimeValues} from '../Utils/utils';

const useCountdown = (targetDate, stop) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    if (stop) clearInterval(interval);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getTimeValues(countDown);
};

export {useCountdown};
