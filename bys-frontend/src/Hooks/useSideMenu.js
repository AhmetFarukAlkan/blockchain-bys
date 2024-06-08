import {setExpandedSize} from '../redux/slices/mainSlice';
import {useAppDispatch} from './useRedux';
import {useMain} from './useSlices';

const useSideMenu = () => {

  const {expandedSize} = useMain();

  const dispatch = useAppDispatch();
  const setExpandedValue = (value) => dispatch(setExpandedSize(value));

  const expandedStatus = expandedSize === '350px';

  return {expandedSize, setExpandedValue, expandedStatus};
};

export default useSideMenu;