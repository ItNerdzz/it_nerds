import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface CallbackModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useCallbackModalStore = create<CallbackModalState>()(
  devtools(set => ({
    isOpen: false,
    openModal: () => {
      document.body.classList.add('locked');
      set({ isOpen: true });
    },
    closeModal: () => {
      document.body.classList.remove('locked');
      set({ isOpen: false });
    },
  }))
);

export default useCallbackModalStore;
