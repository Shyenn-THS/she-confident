import Cookies from 'js-cookie';
import { createContext, useReducer, Reducer } from 'react';
import { ModalContent } from '../typings';

type StoreStateType = {
  darkMode: boolean;
  openDrawer: boolean;
  openModal: boolean;
  modalContent: ModalContent;
};

type StoreActionsType = {
  type: string;
  payload: StoreStateType;
};

const initialState: StoreStateType = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  openDrawer: false,
  openModal: false,
  modalContent: {
    title: '',
    description: '',
    action: () => {
      console.log('Test');
    },
    confirmTitle: 'Confirm',
  },
};

export const UIContext = createContext<{
  state: StoreStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const reducer: Reducer<StoreStateType, StoreActionsType> = (
  state: StoreStateType,
  action: StoreActionsType
) => {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };

    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

    case 'CLOSE_DRAWER':
      return { ...state, openDrawer: false };

    case 'OPEN_DRAWER':
      return { ...state, openDrawer: true };

    case 'CLOSE_MODAL':
      return { ...state, openModal: false };

    case 'OPEN_MODAL':
      return { ...state, openModal: true, modalContent: action.payload };
  }
};

type Props = {
  children: React.ReactNode;
};

export const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
