import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from '@dtos/UserDTO'
import { User } from "@services/userService";

export type AuthContextDataProps = {
    user: UserDTO;
    login: (data: any) => void;
    logout: () => void;
    isLoadingUser: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    async function login(user: UserDTO) {
        await User.saveUser(user)
        setUser(user)
    }

    async function logout() {
        try {
            setIsLoadingUser(true)
            await User.remove()
            setUser({} as UserDTO)
        } catch {

        } finally {
            setIsLoadingUser(false)
        }
    }

    async function getUser() {
        try {
            const userLogged = await User.getUser()
            if (userLogged) {
                setUser(userLogged)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUser(false)
        }

    }

    useEffect(() => {
        getUser()
    })

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoadingUser,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
