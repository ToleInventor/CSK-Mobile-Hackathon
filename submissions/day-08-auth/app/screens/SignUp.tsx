import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import styles, { colors } from '../static/styles';
import { supabase } from '../creds/config.supabase.tsx';

export default function SignUp(){
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
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
        Sign Up
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput 
          style={[styles.Textinput, { flex: 1 }]}
          placeholder="Confirm Password"
          placeholderTextColor={colors.subtext}
          secureTextEntry={!isConfirmPasswordVisible}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity 
          style={{ position: 'absolute', right: 20 }}
          onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
        >
          <Ionicons name={isConfirmPasswordVisible ? "eye" : "eye-off"} size={24} color={colors.subtext} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.Text}>
          {loading ? 'SIGNING UP...' : 'SIGN UP'}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.Text, { color: colors.error, textAlign: 'center' }]}>
        {error}
      </Text>
      <TouchableOpacity onPress={() => router.push('/screens/Login')}>
        <Text style={[styles.Text, { textAlign: 'center', textDecorationLine: 'underline' }]}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  </View>);
}
