import {addModal, clearAllModals, removeCurrentModal, removeModal} from '../redux/slices/modalSlice';
import {useAppDispatch} from './useRedux';

const useModalDispatcher = () => {
  const dispatch = useAppDispatch();

  const openModal = ({name, props}) => {
    dispatch(addModal({name, props}));
  };

  const closeModal = ({name}) => {
    dispatch(removeModal({name}));
  };

  const goBackModal = () => {
    dispatch(removeCurrentModal());
  };

  const closeAllModals = () => dispatch(clearAllModals());

  return {
    openModal,
    closeModal,
    goBackModal,
    closeAllModals
  };
};

export default useModalDispatcher;
