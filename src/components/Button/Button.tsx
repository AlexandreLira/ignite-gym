import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
    title: string;
    variant?: 'solid' | 'outline'
}

export function Button({ title, variant, ...rest }: Props) {
    
    if (variant == 'outline') {
        return (
            <NativeBaseButton
                w="full"
                h={14}
                bg="transparent"
                borderWidth={1}
                borderColor="green.500"
                rounded="sm"
                _pressed={{
                    bg: "gray.500"
                }}
                {...rest}
            >
                <Text
                    color="green.500"
                    fontFamily="heading"
                    fontSize="sm"
                >
                    {title}
                </Text>
            </NativeBaseButton>
        )
    }

    return (
        <NativeBaseButton
            w="full"
            h={14}
            bg="green.700"
            rounded="sm"
            _pressed={{
                bg: "green.500"
            }}
            {...rest}
        >
            <Text
                color="white"
                fontFamily="heading"
                fontSize="sm"
            >
                {title}
            </Text>
        </NativeBaseButton>
    )
}