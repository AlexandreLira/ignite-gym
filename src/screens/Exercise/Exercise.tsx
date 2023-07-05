import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from "@components/Button/Button";
import { ExercisesService } from "@services/exercisesService";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { AppError } from "@utils/AppError";
import { api } from "@config/api";
import { Loading } from "@components/Loading/Loading";
import { HistoryService } from "@services/historyService";
import { ToastService } from "@services/ToastService";


type RouteParamsProps = {
    exerciseId: string;
}

export function Exercise() {
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
    const [isLoading, setIsLoading] = useState(true)
    const [isSendingRegister, setIsSendingRegister] = useState(false)

    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const route = useRoute()
    const { exerciseId } = route.params as RouteParamsProps


    async function fetchExerciseDetails() {
        setIsLoading(true)
        try {

            const exerciseData = await ExercisesService.getById(exerciseId)
            setExercise(exerciseData)
        } catch (error) {
            const message = 'Não foi possivel carregar os detalhes do exercício'
            ToastService.error(error, message)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setIsSendingRegister(true)
            await HistoryService.register(exerciseId)
            ToastService.sucess('Parabens! Exercício realizado')

            navigation.navigate('Home')
        } catch (error) {
            const message = 'Não foi possivel carregar os detalhes do exercício'
            ToastService.error(error, message)
        } finally {
            setIsSendingRegister(false)
        }
    }

    function handleGoBack() {
        navigation.goBack()
    }

    useEffect(() => {
        fetchExerciseDetails()
    }, [exerciseId])


    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1}>
            <VStack px={8} bg="gray.600" pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
                    <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily="heading">
                        {exercise.name}
                    </Heading>

                    <HStack>
                        <BodySvg />
                        <Text color="gray.200" ml={1} textTransform="capitalize">
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
            <ScrollView>


                <VStack p={8}>
                    <Box rounded="lg" mb={3} overflow="hidden">
                        <Image
                            w="full"
                            h={80}
                            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                            alt="Foto do exercício"
                            resizeMode="cover"
                        />
                    </Box>


                    <Box bg="gray.600" rounded="md" pb={4} px={4}>
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            mb={6}
                            mt={5}
                        >
                            <HStack>
                                <SeriesSvg />
                                <Text color="gray.200" ml={2}>
                                    {exercise.series} Séries
                                </Text>
                            </HStack>

                            <HStack>
                                <RepetitionsSvg />
                                <Text color="gray.200" ml={2}>
                                    {exercise.repetitions} repetições
                                </Text>
                            </HStack>

                        </HStack>
                        <Button
                            title="Marcar como realizado"
                            onPress={handleExerciseHistoryRegister}
                            isLoading={isSendingRegister}
                        />
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    )
}