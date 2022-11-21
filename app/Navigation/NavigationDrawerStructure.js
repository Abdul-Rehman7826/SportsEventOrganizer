import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
export default NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (

        <TouchableOpacity style={{ width: 25, height: 25, marginLeft: 50 }} onPress={() => toggleDrawer()}>
            {/*Donute Button Image */}
            <Image
                source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
                style={{ width: 25, height: 25, marginLeft: 5 }}
            />
        </TouchableOpacity>

    );
}