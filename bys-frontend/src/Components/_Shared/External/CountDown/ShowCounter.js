import React from 'react';
import BaseParagraph from '../../../common/base-paragraph/BaseParagraph';
import DateTimeDisplay from './DateTimeDisplay';

const ShowCounter = ({days, hours, minutes, seconds}) => {
  return (
    <div className="show-counter">
      <div
        className="flex text-center"
      >
        <DateTimeDisplay value={hours} isDanger={false}/>
        <BaseParagraph className="my-auto mx-1" text={':'}/>
        <DateTimeDisplay value={minutes} isDanger={false}/>  
      </div>
    </div>
  );
};

export default ShowCounter;
