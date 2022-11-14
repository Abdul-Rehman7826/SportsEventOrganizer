import 'react-native-gesture-handler';

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import colors from '../config/colors';
import Posts from './postNavigation';
import MyPosts from './mypostNavigation';
import Chat from './chatNavigation';
import Team from './teamNavigation';
import { AuthContext } from '../store/auth-context';

const Drawer = createDrawerNavigator();
const authCtx = useContext(AuthContext);

function DrawerNavigation() {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: 'white',
                activeBackgroundColor: colors.primary500
            }}

            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false
            }}
        >
            <Drawer.Screen
                name="Posts"

                options={{
                    drawerIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={size} style={{ padding: 2 }} />
                    ),
                    drawerLabel: 'Posts'
                }}
                component={Posts} />
            <Drawer.Screen
                name="MyPosts"
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="post-outline" size={size} color={color} />
                    ),
                    drawerLabel: 'My Posts'
                }}
                component={MyPosts} />
            <Drawer.Screen
                name="Chat"
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="messages" size={size} color={color} />
                    ),
                    drawerLabel: 'Messages'
                }}
                component={Chat} />
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
    return (
        <DrawerContentScrollView {...props} >
            <StatusBar barStyle={'light-content'} translucent={false} />
            <ImageBackground blurRadius={15} source={require('./assets/beach.jpg')} style={{ width: "100%", height: 210, marginTop: -5, marginBottom: 5, }} >
                <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Image source={require('./assets/dpIcon.png')} style={{ width: 80, height: 80, borderRadius: 50, }} />
                    <Text style={{ color: 'white', }}>Harry Potter</Text>
                </View>
            </ImageBackground>

            <DrawerItemList {...props} />

            <TouchableOpacity onPress={() => { authCtx.logout() }}>
                <DrawerItem
                    label="Log-out"
                    icon={({ color, size }) =>
                        <Feather
                            color={color}
                            size={size}
                            name={'log-out'} />
                    }
                />
            </TouchableOpacity>

        </DrawerContentScrollView>

    );
}
export default DrawerNavigation;
