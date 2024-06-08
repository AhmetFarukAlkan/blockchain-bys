import React from 'react';
import {useGlobalLoading} from '../../../Hooks/useSlices';
import loadingGif from '../../../../src/Assets/Img/loading.gif'
import BaseView from '../base-view/BaseView';

const Loading = () => {
  const {loading} = useGlobalLoading();

  return (
    <>
      {loading > 0 && (
        <BaseView
          className="fixed left-0 top-0 flex items-center justify-center z-50 w-full h-full bg-gray-800/50 backdrop-blur-sm">
          <BaseView role="status">
            <img  src={loadingGif} alt={"Loading"} width={100}/>
          </BaseView>
        </BaseView>
      )}
    </>
  );
};

export default Loading;
