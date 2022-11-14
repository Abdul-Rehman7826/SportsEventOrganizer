import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'


const SUPABASE_URL = "https://utvogrvlrqwaunjqpryp.supabase.co"
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dm9ncnZscnF3YXVuanFwcnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTY4ODMsImV4cCI6MTk4Mjk3Mjg4M30.DHRQ5UnNbjR-ZraSYL7mNfN5Wep2GG4LQ7VIZeE2DaI'

export const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})