import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
export function SignUp() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} bg="gray.700" px={10}>
                <Image
                    source={BackgroundImg}
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
                        Crie sua conta
                    </Heading>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Confirme a senha"
                        secureTextEntry
                    />

                    <Button title="Acessar" />
                </Center>

                <Button
                    title="Criar conta"
                    variant="outline"
                    mt={24}
                    mb={24}
                />
            </VStack>
        </ScrollView>

    )
}