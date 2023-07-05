import React, { useEffect } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { HStack, Heading, Image, VStack, Text, Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons'
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { API_URL } from '@constants/index';
import { ImageService } from '@services/imageService';
import { api } from '@config/api';

type Props = TouchableOpacityProps & {
    data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: Props) {
    const { demo, group, name, series, thumb, repetitions } = data
    const imageUrl = `${api.defaults.baseURL}/exercise/thumb/${thumb}`
    return (
        <TouchableOpacity {...rest}>
            <HStack bg="gray.500" p={2} pr={4} rounded="md" mb={3} alignItems="center">
                <Image
                    source={{ uri: imageUrl }}
                    alt="Imagem do exercício"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={4}
                    resizeMode="cover"
                />

                <VStack justifyContent="space-evenly" flex={1}>
                    <Heading fontSize="lg" color="white" fontFamily="heading">
                        {name}
                    </Heading>

                    <Text fontSize="sm" color="gray.200" numberOfLines={2}>
                        {series} séries x {repetitions} repetições
                    </Text>
                </VStack>

                <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
            </HStack>
        </TouchableOpacity>

    )
}