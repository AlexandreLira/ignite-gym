import { UserDTO } from "@dtos/UserDTO";
import { api } from "../../src/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/storageConfig";
import { isJsxSelfClosingElement } from "typescript";

interface IUserCreate {
    email: string;
    name: string;
    password: string;
}

interface IUserSignIn {
    email: string;
    password: string;
}

interface ISignInReturn {
    user: UserDTO;
    token: string;
    refresh_token: string;
}


interface IUserUpdate {
    name: string;
    password: string;
    old_password: string;
}
export class UserService {
    static async create(data: IUserCreate) {
        const { email, name, password } = data
        const payload = { email, name, password }
        const result = await api.post('users', payload)

        return result
    }


    static async update(data: IUserUpdate) {
        try {
            const payload = data
            const response = await api.put('/users', payload)
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async signIn(user: IUserSignIn): Promise<ISignInReturn> {
        try {
            const payload = user
            const response = await api.post('sessions', payload)
            return response.data
        } catch (error) {
            throw error
        }
    }

    static async saveUser(user: UserDTO) {
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
    }

    static async remove() {
        await AsyncStorage.removeItem(USER_STORAGE)
    }

    static async get(): Promise<UserDTO | null> {
        const response = await AsyncStorage.getItem(USER_STORAGE)
        if (!response) return null
        const user = JSON.parse(response!)

        return user
    }
}