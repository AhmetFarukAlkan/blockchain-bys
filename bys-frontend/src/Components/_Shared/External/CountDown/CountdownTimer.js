import React from 'react';
import {useCountdown} from '../../../../Hooks/useCountdown';
import ExpiredNotice from './ExpiredNotice';
import ShowCounter from './ShowCounter';

const CountdownTimer = ({targetDate, stop}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate, stop);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice/>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
