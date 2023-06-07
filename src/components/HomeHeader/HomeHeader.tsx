import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import userPhotoDefaut from "@assets/userPhotoDefault.png"
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { useAuth } from "@hooks/useAuth";
import { TouchableOpacity } from "react-native";
export function HeaderHome() {
    const { logout, user } = useAuth()
    const avatar = user.avatar ? { uri: user.avatar } : userPhotoDefaut
    function handleLogout() {
        logout()
    }


    return (
        <HStack bg="gray.600" px={8} pb={5} pt={16} alignItems="center">
            <UserPhoto
                source={avatar}
                size={16}
                alt="Profile photo"
                mr={4}

            />

            <VStack flex={1}>
                <Text
                    color="gray.100"
                    fontSize="md"
                >
                    Óla
                </Text>

                <Heading
                    color="gray.100"
                    fontSize="md"
                    fontFamily="heading"
                >
                    {user.name}
                </Heading>
            </VStack>
            <TouchableOpacity
                onPress={handleLogout}
            >
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    color="gray.200"
                    size={7}
                />
            </TouchableOpacity>
        </HStack>
    )
}