import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

export const createEvent = async ({ eventTitle, category, eventDate, imageUrl, description }) => {
    return await supabase.from('events').insert({
        eventTitle,
        category,
        eventDate,
        imageUrl,
        description,
        owner_id: supabase.auth.getUser()?.id
    })
}