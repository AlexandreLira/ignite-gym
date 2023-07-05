import { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Box, Center, Heading, ScrollView, Skeleton, Text, Toast, VStack, useToast } from "native-base";
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup';

import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";

import { useAuth } from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImageService } from "@services/imageService";
import { ToastService } from "@services/ToastService";
import { UserService } from "@services/userService";
import { LibraryService } from "@services/libraryService";

import userPhotoDefaut from "@assets/userPhotoDefault.png"
import { api } from "@config/api";


type FormProps = {
    name: string;
    email: string;
    old_password: string;
    password: string;
    confirm_password: string;

}

const schema = yup.object({
    name: yup
        .string()
        .required('Campo nome é obrigatório.'),
    password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .nullable()
        .transform(value => Boolean(value) ? value : null),

    confirm_password: yup
        .string()
        .nullable()
        .transform(value => Boolean(value) ? value : null)
        .oneOf([yup.ref('password')], 'Senhas não são iguais')
        .when('password', {
            is: (Field: any) => Field,
            then: (schema) =>
                schema
                    .required('Informe a confirmação da senha.'),

        })
})

const PHOTO_SIZE = 33

export function Profile() {
    const [isPhotoLoading, setIsPhotoLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const { user, userUpdate } = useAuth()

    const { control, handleSubmit, formState: { errors } } = useForm<FormProps>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user.name,
            email: user.email
        }
    })

    async function handleUserPhotoSelect() {
        setIsPhotoLoading(true)
        try {

            const photo = await LibraryService.imagePicker()
            if (photo) {
                const fileExtersion = photo.uri.split('.').pop()

                const photoFile = {
                    name: `${user.name}.${fileExtersion}`,
                    uri: photo.uri,
                    type: `${photo.type}/${fileExtersion}`
                } as any

                const userPhotoUploadForm = ImageService.create(photoFile)

                const response = await ImageService.upload(userPhotoUploadForm)

                const userUpdated = user
                user.avatar = response.avatar

                await userUpdate(userUpdated)
            }

        } catch (error) {
            ToastService.error(error)
        } finally {
            setIsPhotoLoading(false)
        }
    }

    async function handleProfileUpdate(event: FormProps) {
        try {
            setIsUpdating(true)
            const { name, password, old_password } = event
            const userUpdated = user
            userUpdated.name = name

            const payload = { name, password, old_password }
            await UserService.update(payload)
            await userUpdate(userUpdated)
            ToastService.sucess('Informações atualizadas com sucesso!')
        } catch (error) {
            ToastService.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Profile" />
            <ScrollView px={10}>
                <Center mt={6}>
                    <TouchableOpacity
                        disabled={isPhotoLoading}
                        onPress={handleUserPhotoSelect}
                    >
                        {isPhotoLoading ?
                            <Skeleton
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded="full"
                                startColor="gray.500"
                                endColor="gray.400"
                            />
                            :
                            <UserPhoto
                                source={
                                    user.avatar
                                        ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                                        : userPhotoDefaut}
                                alt="Foto do usuário"
                                size={PHOTO_SIZE}
                            />
                        }


                        <Text
                            color="green.500"
                            fontWeight="bold"
                            fontSize="md"
                            textAlign="center"
                            mt={2}
                            mb={8}
                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>


                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <Input
                                bg="gray.600"
                                placeholder="Nome"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.name?.message}
                            />
                        }
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <Input
                                bg="gray.600"
                                placeholder="Email"
                                value={value}
                                onChangeText={onChange}
                                isDisabled
                                errorMessage={errors.email?.message}
                            />
                        }
                    />


                </Center>

                <VStack mt={12} mb={9}>
                    <Heading
                        color="gray.200"
                        fontSize="md"
                        mb={2}
                        fontFamily="heading"
                    >
                        Alterar senha
                    </Heading>
                    <Center>
                        <Controller
                            control={control}
                            name="old_password"
                            render={({ field: { onChange, value } }) =>
                                <Input
                                    bg="gray.600"
                                    placeholder="Senha antiga"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.old_password?.message}
                                />
                            }
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) =>
                                <Input
                                    bg="gray.600"
                                    placeholder="Nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                />
                            }
                        />

                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field: { onChange, value } }) =>
                                <Input
                                    bg="gray.600"
                                    placeholder="Confirmar senha nova"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.confirm_password?.message}
                                />
                            }
                        />

                        <Button
                            title="Confirmar"
                            mt={4}
                            onPress={handleSubmit(handleProfileUpdate)}
                            isLoading={isUpdating}
                        />
                    </Center>
                </VStack>
            </ScrollView>
        </VStack >
    )
}