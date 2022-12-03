import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';

import Screen from '../../components/Screen'
import colors from '../../config/colors';
import { supabase } from '../../lib/supabase';
import { AuthContext } from '../../store/auth-context';
import ProfilesModal from './ProfilesModal';
import { ListItemSeparator } from '../../components/lists';
import { Avatar } from 'react-native-paper';
const CreateTeamScreen = ({ navigation }) => {

  const authCtx = useContext(AuthContext);
  const [editNameView, setEditNameView] = useState(false);
  const [teamName, setTeamName] = useState();
  const [team_id, setTeam_id] = useState();
  const [team_list, setTeam_list] = useState();

  const hendelDelete = async (item) => {
    console.log(item);
    try {
      const { data, error } = await supabase
        .from('team_list')
        .delete()
        .eq('id', item.id)
      if (error) throw error.message
    } catch (error) {
      console.log(error);
    }
  }
  const SaveData = async () => {
    console.log('Team name::', !team_id);
    try {
      if (!team_id) {
        const { data, error } = await supabase
          .from('teams')
          .insert([
            {
              owner_id: authCtx.user.id,
              teamName
            },
          ]).select();
        if (error) throw error.message;
        if (!error) {
          console.log("data[0].id ::", data[0].id);
          setTeam_id(data[0].id);
        }
      } else {
        const { data, error } = await supabase
          .from('teams')
          .update({ teamName })
          .eq('id', team_id)
          .select();
        if (error) throw error.message;
        if (!error) {
        }

      }

    } catch (error) {
      console.log("::", error);
    }
  }
  const loadTeam = async () => {
    try {
      let { data: tems_view, error } = await supabase
        .from('tems_view')
        .select("*")
        .eq('team_id', team_id);
      if (error) throw error.message;
      if (!error) {
        setTeam_list(tems_view);
      }

    } catch (error) {
      console.log(error);
    }
  }
  const loadData = async () => {
    try {
      let { data: teams, error } = await supabase
        .from('teams')
        .select("*")
        .eq('owner_id', authCtx.user.id);
      if (!error) {
        console.log("Teams data::", teams);
        setTeam_id(teams[0].id)
        setTeamName(teams[0].teamName);
      }
      if (error) throw error.message;
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {

    const temsView = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'team_list' },
        (payload) => {
          loadTeam();
        }
      )
      .subscribe();
    loadData();
    loadTeam();
    return () => { temsView.subscribe }
  }, []);
  return (
    <Screen>
      <StatusBar style='auto' />
      <Modal
        onRequestClose={() => {
          setEditNameView(!editNameView);
        }}
        visible={editNameView}>
        <View style={{ flex: 1, }}>
          <Button
            title={'Close'}
            onPress={() => {
              setEditNameView(false);
            }}
          />
          <View style={{ marginTop: '50%', justifyContent: 'center', alignContent: 'center' }}>

            <TextInput
              style={{ padding: 10, margin: 10, borderWidth: 1 }}
              value={teamName}
              onChangeText={(e) => {
                setTeamName(e);
              }}
            />
            <Button
              title={'Save'}
              onPress={() => {
                SaveData();
                setEditNameView(false);
              }}
            />
          </View>
        </View>
      </Modal>


      <View style={[styles.firstContainer]}>
        <View style={styles.teamName}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{teamName}</Text>
          <Feather
            onPress={() => {
              setEditNameView(true);
            }}
            name="edit"
            size={25}
          />
        </View>
        <ListItemSeparator />

      </View>

      <View>
        <FlatList
          data={team_list}
          renderItem={({ item }) =>
            <View style={styles.listItem}>
              <Avatar.Image size={50} source={{ uri: item.avatar_url }} />
              <View style={{ flexDirection: 'column', padding: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary500 }}>{item.full_name}</Text>
                <Text>{item.email}</Text>
              </View>
              <TouchableOpacity onPress={() => hendelDelete(item)}>
                <Feather
                  name='user-minus'
                  color={colors.primary500}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          }
          style={styles.list}
        />

      </View>
      <ProfilesModal teamId={team_id} />
    </Screen>
  )
}

export default CreateTeamScreen

const styles = StyleSheet.create({
  outContainer: {
    backgroundColor: colors.light,
  },

  teamName: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 10,
    top: 10,
    marginBottom: 10,
  },
  firstContainer: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: colors.background,
    padding: 5,
  },

  btnContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',

  },
  button: {
    padding: 7,
    margin: 10,
    borderWidth: 1,
    borderRadius: 50,
    width: '40%',
  },
  text: {
    color: colors.white,
    padding: 5,
    textAlign: 'center',
    fontWeight: "bold",
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 5,
    elevation: 5,
    borderRadius: 5,
    margin: 5,
  },
  list: {
    backgroundColor: colors.light,
  },
})