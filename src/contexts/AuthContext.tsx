import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from '@dtos/UserDTO'
import { UserService } from "@services/userService";
import { AuthTokenService } from "@services/AuthTokeService";

type signInProps = {
    email: string;
    password: string;
}


export type AuthContextDataProps = {
    user: UserDTO;
    isLoadingUser: boolean;
    logout: () => void;
    signIn: (data: signInProps) => Promise<void>;
    userUpdate: (data: UserDTO) => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}


export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    async function signIn(data: signInProps) {
        try {
            const userlogged = await UserService.signIn(data)
            if (userlogged.user && userlogged.token) {
                await UserService.saveUser(userlogged.user)
                await AuthTokenService.save(userlogged.token)
                setUser(userlogged.user)
            }
        } catch (error) {
            throw error
        }

    }

    async function logout() {
        try {
            setIsLoadingUser(true)
            await UserService.remove()
            await AuthTokenService.remove()
            setUser({} as UserDTO)
        } catch {

        } finally {
            setIsLoadingUser(false)
        }
    }

    async function userUpdate(data: UserDTO) {
        try {
            await UserService.saveUser(data)
            setUser(data)
        } catch (error) {
            throw error
        }
    }

    async function loadUserData() {
        try {
            const userLogged = await UserService.get()
            const token = await AuthTokenService.get()
            if (userLogged && token) {
                setUser(userLogged)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUser(false)
        }

    }

    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoadingUser,
                signIn,
                logout,
                userUpdate,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
