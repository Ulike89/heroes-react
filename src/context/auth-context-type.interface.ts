import type { GoogleUserInfo } from "@/auth/interfaces/google-user-info.interface";

export interface AuthContextType {
    user: GoogleUserInfo | null;
    saveUser: (user: GoogleUserInfo) => void
}