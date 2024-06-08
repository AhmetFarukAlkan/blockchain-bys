import {increase, decrease, reset} from '../redux/slices/loadingSlice';
import {useAppDispatch} from './useRedux';

const useLoadingDispatcher = () => {
  const dispatch = useAppDispatch();

  const increaseLoading = () => {
    dispatch(increase());
  };

  const decreaseLoading = () => {
    dispatch(decrease());
  };

  const resetLoading = () => {
    dispatch(reset());
  };

  return {
    increaseLoading,
    decreaseLoading,
    resetLoading,
  };
};

export default useLoadingDispatcher;
