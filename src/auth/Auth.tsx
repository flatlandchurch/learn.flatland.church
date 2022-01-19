import React, { createContext, ReactElement, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

type SignupPayload = Omit<User, 'isAdmin'> & {
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  verify: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

type Props = { children: ReactElement };

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    return fetch('/.netlify/functions/login', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          type: 'session',
          attributes: {
            email,
            password,
          },
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((d) => d.json())
      .then(({ data: { id, attributes } }) => {
        setUser({
          id,
          ...attributes,
        });
      });
  };
  const signup = (payload: SignupPayload) => {
    return fetch('/.netlify/functions/signup', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          type: 'user',
          attributes: payload,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((d) => d.json())
      .then((res) => {
        if (res.errors && res.errors.length) {
          return [res, null];
        }

        const { id, attributes } = res.data;
        setUser({
          id,
          ...attributes,
        });
        return [null, res];
      });
  };
  const logout = () => {};
  const verify = async () => {
    const res = await fetch('/.netlify/functions/verify');
    const isVerified = res.status === 200;
    if (!isVerified) {
      setUser(null);
    } else {
      const { id, attributes } = (await res.json()).data;
      setUser({
        id,
        ...attributes,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
