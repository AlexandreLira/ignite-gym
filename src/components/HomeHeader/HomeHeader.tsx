import { Box, Center, HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import userPhotoDefaut from "@assets/userPhotoDefault.png"
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
export function HeaderHome() {
    return (
        <HStack bg="gray.600" px={8} pb={5} pt={16} alignItems="center">
            <UserPhoto
                source={{ uri: 'https://media.istockphoto.com/id/1273297997/pt/vetorial/default-avatar-profile-icon-grey-photo-placeholder-hand-drawn-modern-man-avatar-profile.jpg?s=170667a&w=0&k=20&c=WNmepfNFHch8p2K8zGEUyuvIPzF6YYbVyN0SMv2PlUQ='}}
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
                >
                    Alexandre
                </Heading>
            </VStack>

            <Icon
                as={MaterialIcons}
                name="logout"
                color="gray.200"
                size={7}
            />
        </HStack>
    )
}