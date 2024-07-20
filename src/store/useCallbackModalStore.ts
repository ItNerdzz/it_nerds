import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface CallbackModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useCallbackModalStore = create<CallbackModalState>()(
  devtools((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  }))
)

export default useCallbackModalStore
