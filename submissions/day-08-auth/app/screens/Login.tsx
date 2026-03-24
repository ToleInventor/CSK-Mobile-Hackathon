import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import styles, { colors } from '../static/styles';
import { supabase } from '../creds/config.supabase.tsx';

export default function Login(){
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        if (error.message.toLowerCase().includes('confirm') || error.message.toLowerCase().includes('verify')) {
          router.push('/screens/EmailNotConfirmed');
        } else {
          setError(error.message);
        }
      } else {
        router.push('/screens/Home');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
    setLoading(false);
  };

  return(
  <View style={styles.body}>
    <View style={styles.LogCont}>
      <Text style={styles.heading}>
        Login to continue
      </Text>
      <TextInput 
        style={styles.Textinput}
        placeholder="Email"
        placeholderTextColor={colors.subtext}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput 
          style={[styles.Textinput, { flex: 1 }]}
          placeholder="Password"
          placeholderTextColor={colors.subtext}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity 
          style={{ position: 'absolute', right: 20 }}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={24} color={colors.subtext} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.Text}>
          {loading ? 'LOGGING IN...' : 'LOGIN'}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.Text, { color: colors.error, textAlign: 'center' }]}>
        {error}
      </Text>      <TouchableOpacity onPress={() => router.push('/screens/SignUp')}>
        <Text style={[styles.Text, { textAlign: 'center', textDecorationLine: 'underline' }]}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>    </View>
  </View>);
}
