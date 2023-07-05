import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Toast } from 'native-base';
import { api } from '@config/api';

export class ImageService {
    static async upload(image: FormData) {
        try {
            const response = await api.patch('/users/avatar', image, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            throw error
        }
    }

    static create(photoFile: any) {
        const photoForm = new FormData()
        photoForm.append('avatar', photoFile)
        return photoForm
    }
}