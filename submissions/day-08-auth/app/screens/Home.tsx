import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import styles, { colors } from '../static/styles';
import { supabase } from '../creds/config.supabase';
import { useState } from 'react';

export default function Home(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
    setLoading(false);
  };

  return(
  <View style={styles.body}>
    <View style={styles.LogCont}>
      <Text style={styles.heading}>
        Welcome!
      </Text>
      <Text style={styles.Text}>
        You are successfully logged in.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout} disabled={loading}>
        <Text style={styles.Text}>
          {loading ? 'LOGGING OUT...' : 'LOGOUT'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>);
}