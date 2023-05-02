import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { History } from '@screens/History/History'
import { Home } from '@screens/Home/Home'
import { Profile } from '@screens/Profile/Profile'

import ProfileSvg from '@assets/profile.svg'
import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import { useTheme } from 'native-base'
import { SvgProps } from 'react-native-svg'
import { Platform } from 'react-native'

type AppRoutes = {
    Home: undefined;
    History: undefined;
    Profile: undefined;
}

type ScreensProps = {
    name: keyof AppRoutes;
    component: React.FC;
    Icon: React.FC<SvgProps>
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

export function AppRoutes() {
    const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()
    const { sizes, colors } = useTheme()
    const iconSize = sizes['6']

    const screens: ScreensProps[] = [
        {
            name: 'Home',
            component: Home,
            Icon: HomeSvg
        },
        {
            name: 'History',
            component: History,
            Icon: HistorySvg
        },
        {
            name: 'Profile',
            component: Profile,
            Icon: ProfileSvg
        },
    ]

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.green['500'],
                tabBarInactiveTintColor: colors.gray['200'],
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: colors.gray['600'],
                    borderRadius: 16,
                    borderTopRightRadius: 16,
                    marginBottom: 20,
                    marginHorizontal: 20,
                    height: Platform.OS === 'android' ? 60 : 96
                }
            }}
        >
            {screens.map(screen =>
                <Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        tabBarIcon: ({color}) =>
                            <screen.Icon
                                fill={color}
                                width={iconSize}
                                height={iconSize}
                            />
                    }}
                />

            )}
        </Navigator>
    )
}