import React, { createContext, ReactElement, useContext, useState } from 'react';

type User = {
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verify: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

type Props = { children: ReactElement };

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    console.log({ email, password });
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
      .then((d) => {
        console.log(d);
      });
  };
  const logout = () => {};
  const verify = async () => {
    const isVerified = await fetch('/.netlify/functions/verify').then((d) => d.status !== 400);
    if (!isVerified) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
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
