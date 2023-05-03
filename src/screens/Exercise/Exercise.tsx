import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from "@components/Button/Button";

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleGoBack() {
        navigation.goBack()
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
                    <Heading color="gray.100" fontSize="lg" flexShrink={1}>
                        Puxada frontal
                    </Heading>

                    <HStack>
                        <BodySvg />
                        <Text color="gray.200" ml={1} textTransform="capitalize">
                            Costas
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
            <ScrollView>


                <VStack p={8}>
                    <Image
                        w="full"
                        h={80}
                        source={{ uri: "https://www.dicasdetreino.com.br/wp-content/uploads/2017/07/Tipos-de-Pegada-Treino-de-Costas.jpg" }}
                        alt="Foto do exercício"
                        rounded="md"
                        resizeMode="cover"
                        mb={4}
                    />


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
                                    3 Séries
                                </Text>
                            </HStack>

                            <HStack>
                                <RepetitionsSvg />
                                <Text color="gray.200" ml={2}>
                                    12 repetições
                                </Text>
                            </HStack>

                        </HStack>
                        <Button title="Marcar como realizado" />
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    )
}