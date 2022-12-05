import { useContext } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../store/auth-context";
const authCtx = useContext(AuthContext);
export const createEvent = async (eventTitle, category, eventDate, imageUrl, description) => {
    return await supabase.from('events').insert([{
        eventTitle,
        category,
        eventDate,
        imageUrl,
        description,
        owner_id: authCtx.user.id
    }])
}