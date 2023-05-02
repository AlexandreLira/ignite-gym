import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { HStack, Heading, Image, VStack, Text, Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {

}

export function ExerciseCard({ ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack bg="gray.500" p={2} pr={4} rounded="md" mb={3} alignItems="center">
                <Image
                    source={{ uri: 'https://www.origym.com.br/upload/remada-unilateral-3.png' }}
                    alt="Imagem do exercício"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={4}
                    resizeMode="cover"
                />

                <VStack justifyContent="space-evenly" flex={1}>
                    <Heading fontSize="lg" color="white">
                        Remanda unilateral
                    </Heading>

                    <Text fontSize="sm" color="gray.200" numberOfLines={2}>
                        3 séries x 12 repetições
                    </Text>
                </VStack>

                <Icon as={Entypo} name="chevron-thin-right" color="gray.300"/>
            </HStack>
        </TouchableOpacity>

    )
}