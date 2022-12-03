import { Alert, Button, FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase';
import { AuthContext } from '../../store/auth-context';
import colors from '../../config/colors';
import { Feather } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

const ProfilesModal = ({ teamId }) => {

    const authCtx = useContext(AuthContext);
    const [user, setUser] = useState(authCtx.user);
    const [editTeamView, setEditTeamView] = useState(false);
    const [profileData, setProfileData] = useState([]);

    const hendelPress = async (item) => {
        try {
            if (teamId) {
                const { data, error } = await supabase
                    .from('team_list')
                    .insert([
                        {
                            team_id: teamId,
                            member_id: item.id
                        },
                    ])
                setProfileData(profileData.filter((m) => m.id !== item.id));
            } else {
                Alert.alert("Error", 'Please add Team Name first', [
                    { text: "OK", onPress: () => setEditTeamView(!editTeamView) }
                ]);
            }


        } catch (error) {
            console.log(error);
        }
    }
    const loadData = async () => {
        try {
            const { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .neq('id', authCtx.user.id);
            if (error) throw error.message;
            if (!error) {
                setProfileData(profiles);
            }
        } catch (error) {
            Alert.alert('Error !', error)
        } finally {
            // console.log("data profileData loaded::");
        }
    }
    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <View
                style={[styles.EditTeam, styles.shadowOpt]}>
                <Feather
                    onPress={() => {
                        setEditTeamView(true);
                    }}
                    name='plus'
                    size={25}
                    color={colors.white}
                />
            </View>
            <Modal
                onRequestClose={() => {
                    setEditTeamView(!editTeamView);
                }}
                animationType="slide"
                visible={editTeamView}>
                <View style={{ flex: 1, }}>
                    <Button
                        title={'Close'}
                        onPress={() => {
                            setEditTeamView(false);
                        }}
                    />
                    <FlatList
                        data={profileData}
                        renderItem={({ item }) =>
                            <View style={styles.listItem}>
                                <Avatar.Image size={50} source={{ uri: item.avatar_url }} />
                                <View style={{ flexDirection: 'column', padding: 5 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary500 }}>{item.full_name}</Text>
                                    <Text>{item.email}</Text>
                                </View>
                                <TouchableOpacity onPress={() => hendelPress(item)}>
                                    <Feather
                                        name='plus-circle'
                                        color={colors.primary500}
                                        size={50}
                                    />
                                </TouchableOpacity>
                            </View>
                        }
                        style={styles.list}
                    />
                </View>
            </Modal>
        </>
    )
}

export default ProfilesModal;

const styles = StyleSheet.create({
    EditTeam: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 50,
        bottom: 10,
        right: 10,
        backgroundColor: colors.black,
    },
    shadowOpt: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    list: {
        padding: 10,
        backgroundColor: colors.light,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 5,
        marginVertical: 5,
        elevation: 5,
        borderRadius: 5
    }
})