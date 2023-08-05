import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ModalContent } from '../interfaces/typings';

interface UiState {
  darkMode: boolean;
  openDrawer: boolean;
  openModal: boolean;
  modalContent: ModalContent | null;
  setDarkMode: (darkMode: boolean) => void;
  setOpenDrawer: (openDrawer: boolean) => void;
  setOpenModal: (openModal: boolean) => void;
  setModalContent: (modalContent: ModalContent) => void;
}

const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        darkMode: false,
        openDrawer: false,
        openModal: false,
        modalContent: null,
        setDarkMode: (darkMode: boolean) => set({ darkMode }),
        setOpenDrawer: (openDrawer: boolean) => set({ openDrawer }),
        setOpenModal: (openModal: boolean) => set({ openModal }),
        setModalContent: (modalContent: ModalContent) => set({ modalContent }),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ foo: state.darkMode }),
      }
    )
  )
);

export default useUiStore;
