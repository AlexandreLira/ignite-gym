import {
    VStack,
    Image,
    Center,
    Text,
    Heading,
    ScrollView
} from "native-base";
import { useNavigation } from '@react-navigation/native'

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";

export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleNewAccount() {
        navigation.navigate('signUp')
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinado"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={24}>
                    <LogoSvg />
                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center>
                    <Heading color="gray.100" mb={6} fontFamily="heading">
                        Acesse sua conta
                    </Heading>
                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Button title="Acessar" />
                </Center>

                <Text
                    color="gray.100"
                    fontSize="sm"
                    mb={3}
                    mt={24}
                    fontFamily="body"
                    textAlign="center"
                >
                    Ainda não tem acesso?
                </Text>

                <Button
                    title="Criar conta"
                    variant="outline"
                    onPress={handleNewAccount}
                />
            </VStack>
        </ScrollView>

    )
}