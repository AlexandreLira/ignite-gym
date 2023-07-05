import { api } from "@config/api"
import { ExerciseDTO } from "@dtos/ExerciseDTO"

export class ExercisesService {

    static async getByGroup(group: string): Promise<ExerciseDTO[]> {
        const response = await api.get(`/exercises/bygroup/${group}`)
        const execises = response.data
        return execises
    }

    static async getById(id: string): Promise<ExerciseDTO> {
        try {
            const response = await api.get(`/exercises/${id}`)
            const execises = response.data
            return execises
        } catch (error) {
            throw error
        }
    }
}