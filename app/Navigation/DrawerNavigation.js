import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ImageBackground, View, Text, Image } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import colors from '../config/colors';
import Posts from './postNavigation';
import MyPosts from './mypostNavigation';
import Chat from './chatNavigation';
import Profile from './profileNavigation';
import Team from './teamNavigation';

import { AuthContext } from '../store/auth-context';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: colors.white,
                activeBackgroundColor: colors.primary500,
                itemStyle: { marginVertical: 5 },
            }}
            drawerPosition={'right'}
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen
                name="Posts"
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={size} style={{ padding: 2 }} />
                    ),
                    drawerLabel: 'Events'
                }}
                component={Posts} />
            <Drawer.Screen
                name="MyPosts"
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="post-outline" size={size} color={color} />
                    ),
                    drawerLabel: 'My Events'
                }}
                component={MyPosts} />
            <Drawer.Screen
                name="Chat"
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="message" size={size} color={color} />
                    ),
                    drawerLabel: 'Messages'
                }}
                component={Chat} />
            <Drawer.Screen
                name="Profile"
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" size={size} color={color} />
                    ),
                    drawerLabel: 'Profile'
                }}
                component={Profile} />

            <Drawer.Screen
                name="Team"
                options={{
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="team" size={size} color={color} />
                    ),
                    drawerLabel: 'Teams'
                }}
                component={Team} />
        </Drawer.Navigator>

    );
}

function CustomDrawer({ ...props }) {
    const authCtx = React.useContext(AuthContext);
    // console.log(authCtx.user.user_metadata)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} translucent={false} />
            <ImageBackground blurRadius={15} source={require('../assets/beach.jpg')} style={{ width: "100%", height: 210, marginTop: -5, marginBottom: 5, }} >
                <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Image source={require('../assets/dpIcon.png')} style={{ width: 80, height: 80, borderRadius: 50, }} />
                    <Text style={{ color: colors.white, padding: 10, fontSize: 20, fontWeight: 'bold' }}>{authCtx.user?.user_metadata?.full_name}</Text>
                </View>
            </ImageBackground>
            <DrawerContentScrollView {...props} >
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Log-out"
                    icon={({ color, size }) =>
                        <Feather
                            color={color}
                            size={size}
                            name={'log-out'} />
                    }
                    onPress={() => authCtx.logout()}
                />

            </DrawerContentScrollView>
            <>
                <Text style={{ color: colors.primary100, fontSize: 16, margin: 10, textAlign: 'center', color: 'grey' }}>
                    Sports Event Organizer
                </Text>
            </>
        </SafeAreaView>

    );
}
export default DrawerNavigation;
