import { useEffect } from 'react';

let keyHandlers = [];

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    keyHandlers.forEach((handler) => handler());
  }
};

const useEnterKeyHandler = (onClick, isKeyHandler) => {
  useEffect(() => {
    if (isKeyHandler && onClick) {
      keyHandlers.push(onClick);

      return () => {
        keyHandlers = keyHandlers.filter((handler) => handler !== onClick);
      };
    }
  }, [onClick, isKeyHandler]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
};

export default useEnterKeyHandler;
