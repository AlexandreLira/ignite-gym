import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type InputProps = IInputProps & {
    errorMessage?: string | null
}

export function Input({ errorMessage, isInvalid, ...rest }: InputProps) {
    const inputIsInvalid = Boolean(errorMessage) || isInvalid
    return (
        <FormControl isInvalid={inputIsInvalid} mb={4}>
            <NativeBaseInput
                bg="gray.700"
                h={14}
                px={4}
                borderWidth={0}
                fontSize="md"
                color="white"
                fontFamily="body"
                isInvalid={inputIsInvalid}
                placeholderTextColor="gray.300"
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.800"
                }}
                _focus={{
                    bg: 'gray.700',
                    borderWidth: 1,
                    borderColor: 'green.500'
                }}
                {...rest}
            />
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}