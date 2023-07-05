import { Toast } from "native-base"
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export class LibraryService {
    static async imagePicker(): Promise<ImagePicker.ImagePickerAsset | undefined> {
        try {
            let photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1
            })

            if (!photoSelected.canceled) {
                const photo = photoSelected.assets[0]
                const photoInfo = await FileSystem.getInfoAsync(photo.uri)

                if (photoInfo.exists) {
                    const PhotoSizeMB = photoInfo.size / 1024 / 1024
                    if (PhotoSizeMB > 5) {
                        return Toast.show({
                            title: 'Essa imagem é muito grande',
                            bgColor: 'red.500'
                        })
                    }

                    return photo
                }
            }
        } catch (error) {
            throw error
        }
    }
}