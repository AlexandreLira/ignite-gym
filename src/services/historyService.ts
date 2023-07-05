import { api } from "@config/api"
const route = '/history'
export class HistoryService {

    static async register(exerciseId: string) {
        try {
            await api.post(route, { exercise_id: exerciseId })
        } catch (error) {
            throw error
        }
    }
    static async get() {
        try {
            const response = await api.get(route)
            const history = response.data
            return history
        } catch (error) {
            throw error
        }
    }
}