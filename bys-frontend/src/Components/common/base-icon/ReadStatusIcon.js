import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReadStatusIcon = ({ isRead, className }) => {
  return (
    <FontAwesomeIcon
      icon={isRead ? ['fa-solid', 'fa-check'] : ['fa-solid', 'fa-circle-info']}
      size="xl"
      color={isRead ? 'green' : 'orange'}
      className={className || ''}
    />
  );
};

export default ReadStatusIcon;
