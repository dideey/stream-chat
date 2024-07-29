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
      if (!state.currentUser) {
        console.error('currentUser is not defined');
        return state;
      }

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
  console.log('currentUser in ChatContextProvider:', currentUser);

  // Initialize state with currentUser information if available
  const [state, dispatch] = useReducer(chatReducer, {
    ...INITIAL_STATE,
    currentUser,
  });

  // Function to change the current chat user
  const setCurrentChat = (user) => {
    console.log('Setting current chat with user:', user);
    if (dispatch) {
      dispatch({ type: 'CHANGE_USER', payload: user });
    } else {
      console.error('dispatch function is not available');
    }
  };

  // Provide context with state, dispatch, and the setCurrentChat function
  return (
    <ChatContext.Provider value={{ data: state, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  );
};
