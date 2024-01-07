import {
  ApplicationVerifier,
  ConfirmationResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  signInWithPhoneNumber as signInWithPhoneNumberFirebase,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import { auth } from "../../domain/utils/firebase";

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: unknown;
}

interface AuthContextValue extends AuthState {
  method: "Firebase";
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<unknown>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<unknown>;
  signInWithPhoneNumber: (
    phoneNumber: string,
    appVerifier: ApplicationVerifier
  ) => Promise<ConfirmationResult>;
  verifyCode: (code: string, result: ConfirmationResult) => Promise<unknown>;
  signInWithGoogle: () => Promise<unknown>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthStateChangedAction = {
  type: "AUTH_STATE_CHANGED";
  payload: {
    isAuthenticated: boolean;
    user: unknown;
  };
};

type Action = AuthStateChangedAction;

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: AuthState, action: Action): AuthState => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  method: "Firebase",
  createUserWithEmailAndPassword: (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  signInWithEmailAndPassword: async (
    email: string,
    password: string
  ): Promise<unknown> => {
    const response = await signInWithEmailAndPasswordFirebase(
      auth,
      email,
      password
    );
    return response;
  },
  signInWithPhoneNumber: async (
    phoneNumber: string,
    appVerifier: ApplicationVerifier
  ): Promise<ConfirmationResult> => {
    try {
      const response = await signInWithPhoneNumberFirebase(
        auth,
        phoneNumber,
        appVerifier
      );
      return response;
    } catch (err) {
      throw new Error();
    }
  },
  verifyCode: async (code: string, result: ConfirmationResult) => {
    try {
      const response = await result.confirm(code);
      return response;
    } catch (err) {
      throw new Error();
    }
  },
  signInWithGoogle: () => {
    return Promise.resolve();
  },
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              avatar: user.photoURL,
              email: user.email,
              name: user.email,
            },
          },
        });
      } else {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    });
  }, [dispatch]);

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<unknown> => {
    const response = await signInWithEmailAndPasswordFirebase(
      auth,
      email,
      password
    );
    return response;
  };

  const signInWithPhoneNumber = async (
    phoneNumber: string,
    appVerifier: ApplicationVerifier
  ): Promise<ConfirmationResult> => {
    try {
      const response = await signInWithPhoneNumberFirebase(
        auth,
        phoneNumber,
        appVerifier
      );
      return response;
    } catch (err) {
      throw new Error();
    }
  };

  const verifyCode = (code: string, result: ConfirmationResult) => {
    const response = result.confirm(code);
    return response;
  };

  const signInWithGoogle = (): Promise<unknown> => {
    return Promise.resolve();
  };

  const logout = async (): Promise<void> => {
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "Firebase",
        createUserWithEmailAndPassword: () => Promise.resolve(),
        signInWithEmailAndPassword,
        signInWithGoogle,
        signInWithPhoneNumber,
        verifyCode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
