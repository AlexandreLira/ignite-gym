import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Box, Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";

import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";



const PHOTO_SIZE = 33
const DEFAULT_IMAGE = 'https://media.istockphoto.com/id/1273297997/pt/vetorial/default-avatar-profile-icon-grey-photo-placeholder-hand-drawn-modern-man-avatar-profile.jpg?s=170667a&w=0&k=20&c=WNmepfNFHch8p2K8zGEUyuvIPzF6YYbVyN0SMv2PlUQ='

export function Profile() {
    const [isPhotoLoading, setIsPhotoLoading] = useState(false)
    const [image, setImage] = useState<string>();

    const toast = useToast()

    async function handleUserPhotoSelect() {
        setIsPhotoLoading(true)
        try {

            let photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1
            })

            if (!photoSelected.canceled) {
                const photo = photoSelected.assets[0].uri
                const photoInfo = await FileSystem.getInfoAsync(photo)

                if (photoInfo.exists) {
                    const PhotoSizeMB = photoInfo.size / 1024 / 1024
                    if (PhotoSizeMB > 5) {
                        return toast.show({
                            title: 'Essa imagem é muito grande',
                            bgColor: 'red.500'
                        })
                    }
                }
                setImage(photo)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsPhotoLoading(false)
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
                                source={{ uri: image || DEFAULT_IMAGE }}
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

                    <Input
                        bg="gray.600"
                        placeholder="Nome"
                    />

                    <Input
                        bg="gray.600"
                        placeholder="Email"
                        isDisabled
                    />
                </Center>

                <VStack mt={12} mb={9}>
                    <Heading
                        color="gray.200"
                        fontSize="md"
                        mb={2}
                    >
                        Alterar senha
                    </Heading>
                    <Center>
                        <Input
                            bg="gray.600"
                            placeholder="Senha antiga"
                            secureTextEntry
                        />
                        <Input
                            bg="gray.600"
                            placeholder="Nova senha"
                            secureTextEntry
                        />
                        <Input
                            bg="gray.600"
                            placeholder="Confirmar senha nova"
                            secureTextEntry
                        />
                        <Button title="Confirmar" mt={4} />
                    </Center>
                </VStack>
            </ScrollView>
        </VStack >
    )
}