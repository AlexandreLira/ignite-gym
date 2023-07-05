import { HeaderHome } from "@components/HomeHeader/HomeHeader";
import { Group } from "@components/Group/Group";
import { Box, Center, HStack, Text, VStack, FlatList, Heading, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard/ExerciseCard";
import { Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { GroupsService } from "@services/groupsServices";
import { ExercisesService } from "@services/exercisesService";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading/Loading";
import { ToastService } from "@services/ToastService";

export function Home() {
    const [groups, setGroups] = useState<string[]>([])
    const [groupSelected, setGroupSelected] = useState('')
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])
    const [isLoading, setIsloading] = useState(true)

    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const toast = useToast();

    function handleSelectedGroup(name: string) {
        setGroupSelected(name)
    }

    async function fetchGroups() {
        try {
            const groupsData = await GroupsService.get()
            setGroups(groupsData)
            setGroupSelected(groupsData[0])

        } catch (error) {
            const title = 'Não foi possivel carregar os grupos musculares'
            ToastService.error(error, title)
        }
    }

    async function loadExecises() {
        setIsloading(true)
        try {
            const execisesData = await ExercisesService.getByGroup(groupSelected)
            setExercises(execisesData)
        } catch (error) {
            const title = 'Não foi possivel carregar os exercisios'
            ToastService.error(error, title)

        } finally {
            setIsloading(false)
        }

    }

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate('Exercise', { exerciseId })
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    useFocusEffect(useCallback(() => {
        loadExecises()
    }, [groupSelected]))

    return (
        <VStack flex={1}>
            <HeaderHome />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
                renderItem={({ item }) =>
                    <Group
                        name={item}
                        onPress={() => handleSelectedGroup(item)}
                        isActive={groupSelected == item}
                        style={{ marginRight: 10 }}
                    />
                }
            />
            {
                isLoading ? <Loading /> :
                    <VStack px={8} flex={1}>

                        <HStack justifyContent="space-between" mb={5}>
                            <Heading color="gray.200" fontSize="md" fontFamily="heading">Exercícios</Heading>
                            <Text color="gray.200" fontSize="sm">{exercises.length}</Text>
                        </HStack>

                        <FlatList
                            data={exercises}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{ pb: 20 }}
                            renderItem={({ item }) =>
                                <ExerciseCard
                                    onPress={() => handleOpenExerciseDetails(item.id)}
                                    data={item}
                                />
                            }
                        />



                    </VStack>
            }



        </VStack>
    )
}