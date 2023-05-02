import { Box, Center, HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import userPhotoDefaut from "@assets/userPhotoDefault.png"
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
export function HeaderHome() {
    return (
        <HStack bg="gray.600" px={8} pb={5} pt={16} alignItems="center">
            <UserPhoto
                source={{ uri: 'https://instagram.fjdo10-2.fna.fbcdn.net/v/t51.2885-19/312851485_2915160385447231_3240413355314642233_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjdo10-2.fna.fbcdn.net&_nc_cat=107&_nc_ohc=i5UMk0rbmcgAX_-4f4z&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfCOEWaUrOr2uRnT3EVJfzYzY_j_Hm_H-J91vZNr_XoONg&oe=643EF00D&_nc_sid=1527a3' }}
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