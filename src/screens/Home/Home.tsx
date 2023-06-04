import { HeaderHome } from "@components/HomeHeader/HomeHeader";
import { Group } from "@components/Group/Group";
import { Box, Center, HStack, Text, VStack, FlatList, Heading } from "native-base";
import { useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard/ExerciseCard";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
    const data = ['costa', 'peito', 'Tríceps', 'ombro', 'Bíceps']
    const [groupSelected, setGroupSelected] = useState(data[0])
    const [exercises, setExercises] = useState(data)

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleSelectedGroup(name: string) {
        setGroupSelected(name)
    }

    function handleOpenExerciseDetails() {
        navigation.navigate('Exercise')
    }

    return (
        <VStack flex={1}>
            <HeaderHome />
            <FlatList
                data={data}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8, }}
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

            <VStack px={8} flex={1}>

                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md" fontFamily="heading">Exercícios</Heading>
                    <Text color="gray.200" fontSize="sm">{exercises.length}</Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 20 }}
                    renderItem={({ item }) =>
                        <ExerciseCard onPress={handleOpenExerciseDetails} />
                    }
                />



            </VStack>


        </VStack>
    )
}