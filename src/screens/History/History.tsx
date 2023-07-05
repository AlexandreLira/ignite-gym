import { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { Heading, SectionList, Text, VStack } from "native-base";

import { ToastService } from "@services/ToastService";
import { HistoryService } from "@services/historyService";

import { HistoryCard } from "@components/HistoryCard/HistoryCard";
import { Loading } from "@components/Loading/Loading";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";


export function History() {
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])
    const [isLoading, setIsloading] = useState(true)

    async function fetchHistory() {
        try {
            setIsloading(true)
            const historyData = await HistoryService.get()
            setExercises(historyData)
        } catch(error) {
            ToastService.error(error)
        } finally {
            setIsloading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory()
    }, []))



    return (
        <VStack flex={1} >
            <ScreenHeader title="History" />

            {isLoading ? <Loading /> :
                <SectionList
                    sections={exercises}
                    renderItem={({ item }) => <HistoryCard data={item}/>}
                    renderSectionHeader={({ section }) => (
                        <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
                            {section.title}
                        </Heading>
                    )}
                    keyExtractor={item => item.id}
                    px={8}
                    contentContainerStyle={!Boolean(exercises) && { flex: 1, justifyContent: "center" }}
                    ListEmptyComponent={() => (
                        <Text color="gray.100" textAlign="center">
                            Não há exercicios registrados ainda.{'\n'}
                            Vamos fazer exercicios
                        </Text>
                    )}
                />
            }
        </VStack >
    )
}