import { useEffect } from "react";
import {
    VStack,
    Image,
    Center,
    Text,
    Heading,
    ScrollView
} from "native-base";
import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const schema = yup.object({
    name: yup
        .string()
        .required('O campo nome é obrigatório'),
    email: yup
        .string()
        .email()
        .required('O campo e-mail é obrigatório'),
    password: yup
        .string()
        .required('O campo e-mail é obrigatório')
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    password_confirm: yup
        .string()
        .required('Confirme a senha.')
        .oneOf([yup.ref('password')], 'Senhas não são iguais.')

}).required()

export function SignUp() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>()
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(schema)
    });

    function handleGoBack() {
        navigation.goBack()
    }

    function handleSignIn(data: FormDataProps) {
        console.log(data)
    }

    useEffect(() => {

    }, [])

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
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

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

                    <Controller
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirme a senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignIn)}
                                returnKeyType="send"
                                errorMessage={errors.password_confirm?.message}
                            />
                        )}
                    />

                    <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
                </Center>

                <Button
                    title="Voltar para o login"
                    variant="outline"
                    mt={24}
                    mb={24}
                    onPress={handleGoBack}
                />
            </VStack>
        </ScrollView>

    )
}