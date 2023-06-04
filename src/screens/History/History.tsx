import { HistoryCard } from "@components/HistoryCard/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import {Heading, SectionList, Text, VStack } from "native-base";

export function History() {
    const exercises =
        [
            {
                title: '20.2.2012',
                data: ['constas', 'a']

            },
            {
                title: '20.2.2012',
                data: ['constas']

            },
            {
                title: '20.2.2012',
                data: ['constas']

            },
        ]
    return (
        <VStack flex={1} >
            <ScreenHeader title="History" />

            <SectionList
                sections={exercises}
                renderItem={({ item }) => <HistoryCard />}
                renderSectionHeader={({ section }) => (
                    <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
                        {section.title}
                    </Heading>
                )}
                keyExtractor={item => item}
                px={8}
                contentContainerStyle={!Boolean(exercises) && { flex: 1, justifyContent: "center" }}
                ListEmptyComponent={() => (
                    <Text color="gray.100" textAlign="center">
                        Não há exercicios registrados ainda.{'\n'}
                        Vamos fazer exercicios
                    </Text>
                )}
            />
        </VStack >
    )
}