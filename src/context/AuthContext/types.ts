export interface IUser {
  user?: {
    _id: string;
    name: string;
    email: string;
    userType: string;
  };
  token?: string;
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface IAuthProvider {
  children: JSX.Element;
}
