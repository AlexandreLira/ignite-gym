import { AppError } from "@utils/AppError";
import { Toast } from "native-base";

export class ToastService {
    static error(error: unknown, message?: string){
        const isAppError = AppError.isAppError(error)
        const messageTitle = message ? message :  'Error no servidor, tente novamente mais tarde'
        const title = isAppError ? error.message : messageTitle;
        Toast.show({
            title,
            placement: 'bottom',
            bgColor: 'red.500'
        })
    }

    static sucess(message: string) {
        Toast.show({
            title: message,
            placement: 'bottom',
            bgColor: 'green.500'
        })
    }
}