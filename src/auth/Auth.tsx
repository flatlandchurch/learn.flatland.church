import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

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
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = window.localStorage.getItem('fc:learn:user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('fc:learn:user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('fc:learn:user');
    }
  }, [user]);

  const responseHandler = (res) => {
    if (res.errors && res.errors.length) {
      return [res, null];
    }

    const { id, attributes } = res.data;
    setUser({
      id,
      ...attributes,
    });
    return [null, res];
  };

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
      .then(responseHandler);
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
      .then(responseHandler);
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
    setLoading(false);
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
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
