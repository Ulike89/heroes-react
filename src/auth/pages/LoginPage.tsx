import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router"
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google';
import type { GoogleUserInfo } from "../interfaces/google-user-info.interface";
import { useAuth } from "@/context/AuthContext";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { saveUser } = useAuth();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse: TokenResponse) => {
            try {
                // Obtener información del usuario
                const userInfoResponse = await fetch(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );

                if (!userInfoResponse.ok) {
                    throw new Error('Error obteniendo información del usuario');
                }

                const user: GoogleUserInfo = await userInfoResponse.json();

                if (user.email_verified) {
                    saveUser(user);
                    navigate('/heroes');
                }
            } catch (err) {
                console.error('Login error:', err);
            }
        },
        onError: (error: Pick<TokenResponse, 'error' | 'error_description'>) => {
            console.error('Login Failed:', error);
        }
    });

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
            {/* Content */}
            <div className="z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Heroes App
                    </h1>
                    <p className="text-slate-300 text-lg">
                        Explora el universo de héroes
                    </p>
                </div>

                {/* Login Card */}
                <Card className="border border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl text-white">Bienvenido</CardTitle>
                        <CardDescription className="text-slate-300 mt-2">
                            Inicia sesión para continuar
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center gap-6 pt-2">
                        <div className="w-full space-y-3">
                            <p className="text-center text-sm text-slate-300">
                                Autentícate con tu cuenta de Google
                            </p>

                            <Button
                                onClick={() => handleGoogleLogin()}
                                className="w-full h-12 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                            >
                                <img
                                    src="https://www.gstatic.com/images/branding/googleg_gradient/svg/googleg_gradient_standard_24px.svg"
                                    width="20"
                                    height="20"
                                    alt="Google"
                                />
                                <span>Continuar con Google</span>
                            </Button>
                        </div>

                        <div className="w-full pt-4 border-t border-slate-700">
                            <p className="text-xs text-slate-400 text-center">
                                Al continuar, aceptas nuestros términos y condiciones
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}