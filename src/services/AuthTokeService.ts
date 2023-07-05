import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";
import { api } from "../config/api";

export class AuthTokenService {
    static async save(token: string){
        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
        this.update(token)
    }

    static async get(): Promise<string | null> {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
        return token
    }

    static async remove(){
        await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
    }

    static async update(token: string){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}