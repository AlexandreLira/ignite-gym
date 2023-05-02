import { HeaderHome } from "@components/HomeHeader/HomeHeader";
import { Group } from "@components/Group/Group";
import { Box, Center, HStack, Text, VStack, FlatList, Heading } from "native-base";
import { useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard/ExerciseCard";

export function Home() {
    const data = ['costa', 'peito', 'Tríceps', 'ombro', 'Bíceps']
    const [groupSelected, setGroupSelected] = useState(data[0])
    const [exercises, setExercises] = useState(data)

    function handleSelectedGroup(name: string) {
        setGroupSelected(name)
    }
    return (
        <VStack flex={1}>
            <HeaderHome />
            <FlatList
                data={data}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator
                // contentContainerStyle={{ gap: 8 }}
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
                    <Heading color="gray.200" fontSize="md">Exercícios</Heading>
                    <Text color="gray.200" fontSize="sm">{exercises.length}</Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{pb: 20}}
                    renderItem={({ item }) =>
                        <ExerciseCard />
                    }
                />



            </VStack>


        </VStack>
    )
}