import {
    VStack,
    Image,
    Center,
    Text,
    Heading,
    ScrollView
} from "native-base";
import { useNavigation } from '@react-navigation/native'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";

type FormProps = {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup.string().required('Campo email é obrigatório.').email('Digite um email valido.'),
    password: yup.string().required('Campo senha é obrigatório.')
})

export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>()
    const { control, handleSubmit, formState: { errors } } = useForm<FormProps>({
        resolver: yupResolver(schema)
    })

    function handleNewAccount() {
        navigation.navigate('signUp')
    }

    function handleSignIn(data: FormProps) {
        console.log(data)
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
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button title="Acessar" onPress={handleSubmit(handleSignIn)}/>
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