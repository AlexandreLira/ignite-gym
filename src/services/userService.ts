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
    user: UserDTO
}

export class User {
    static async create(data: IUserCreate) {
        const { email, name, password } = data
        const payload = { email, name, password }
        const result = await api.post('users', payload)

        return result
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

    static async getUser(): Promise<UserDTO> {
        const response = await AsyncStorage.getItem(USER_STORAGE)

        const user = JSON.parse(response!)

        return user
    }
}