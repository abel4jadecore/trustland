import {
  ApplicationVerifier,
  ConfirmationResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  signInWithPhoneNumber as signInWithPhoneNumberFirebase,
  signOut,
} from "firebase/auth";
import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import { auth, db } from "../../domain/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AppUser, { User } from "@/features/account/domain/appUser";

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: AppUser | null;
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
  storeUserData: (data: User) => Promise<unknown>;
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
    user: AppUser | null;
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
  storeUserData: async (data: User) => {
    console.log(data);
    return;
  },
  signInWithGoogle: () => {
    return Promise.resolve();
  },
  logout: async () => {
    const response = await signOut(auth);
    return response;
  },
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const appUserRef = doc(db, "users", user.uid);
        const appUserSnapshot = await getDoc(appUserRef);
        const appUser = appUserSnapshot.data() as AppUser | undefined;

        console.log(appUser);
        if (appUser) {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                firstName: appUser.firstName,
                lastName: appUser.lastName,
                email: appUser.email,
                phoneNumber: user.phoneNumber!,
                address: appUser.address,

                isNew: false,
              },
            },
          });
        } else {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                address: "",

                isNew: true,
              },
            },
          });
        }
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

  const storeUserData = async (data: User) => {
    try {
      const userRef = doc(db, "users", data.id);
      await setDoc(userRef, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data?.phoneNumber,
        address: data.address,
      });
      dispatch({
        type: "AUTH_STATE_CHANGED",
        payload: {
          isAuthenticated: true,
          user: {
            ...data,
            isNew: false,
          },
        },
      });
    } catch (err) {
      console.log();
    }
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
        storeUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
