import { api } from "@config/api"

export class GroupsService {
    static async get() {
        try {
            const response = await api.get('/groups')
            const groups = response.data
            return groups
        } catch (error) {
            throw error
        }
    }
}