import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading/Loading';

export function Routes() {

    const { user, isLoadingUser } = useAuth()
    const { colors } = useTheme();
    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    if (isLoadingUser) {
        return <Loading />

    }

    return (
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
                {user.email ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}