import { useEffect } from 'react';

const useImageClickModal = (contentRef, openImgModal, dependency) => {
  useEffect(() => {
    const imgElements = contentRef?.current?.querySelectorAll('img');

    const processImgElements = () => {
      imgElements?.forEach((imgElement) => {
        imgElement.addEventListener('click', () => {
          openImgModal(imgElement.src);
        });
      });
    };

    processImgElements();

    return () => {
      imgElements?.forEach((imgElement) => {
        imgElement.removeEventListener('click', () => {
          openImgModal(imgElement.src);
        });
      });
    };
  }, [contentRef, dependency]);
};

export default useImageClickModal;
