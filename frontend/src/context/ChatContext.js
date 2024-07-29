import React, { createContext, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';

// Create ChatContext
export const ChatContext = createContext();

// Initial state for chat
const INITIAL_STATE = {
  chatId: null,
  user: null,
};

// Reducer function for chat state management
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return {
        user: action.payload,
        chatId: state.currentUser.uid > action.payload.uid
          ? state.currentUser.uid + action.payload.uid
          : action.payload.uid + state.currentUser.uid,
      };

    default:
      return state;
  }
};

// ChatContextProvider component
export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // Initialize state with currentUser information if available
  const [state, dispatch] = useReducer(chatReducer, {
    ...INITIAL_STATE,
    currentUser,
  });

  // Provide context with state and dispatch
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
