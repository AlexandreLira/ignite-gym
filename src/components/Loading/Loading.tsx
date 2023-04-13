import { Center, Spinner } from "native-base";

interface LoadingProps {
    isActive?: boolean
}

export function Loading(props: LoadingProps){
    const {
        isActive = true
    } = props

    if(!isActive){
        return <></>
    }

    return (
        <Center bg="blue.100" flex={1}>
            <Spinner/>
        </Center>
    )
}