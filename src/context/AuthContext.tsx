import type { GoogleUserInfo } from '@/auth/interfaces/google-user-info.interface';
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AuthContextType } from './auth-context-type.interface';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<GoogleUserInfo | null>(() => {
        const storedUser = localStorage.getItem('authUser');
        return storedUser ? JSON.parse(storedUser) as GoogleUserInfo : null;
    });

    const saveUser = (user: GoogleUserInfo): void => {
        setUser(user);
        localStorage.setItem('authUser', JSON.stringify(user));
    };

    const value: AuthContextType = {
        user,
        saveUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};