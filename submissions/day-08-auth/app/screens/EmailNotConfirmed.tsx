import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useRouter } from 'expo-router';
import styles, { colors } from '../static/styles';
import { supabase } from '../creds/config.supabase';
import { useState } from 'react';

export default function EmailNotConfirmed(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleResendConfirmation = async () => {
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) {
        setMessage('Error resending confirmation: ' + error.message);
      } else {
        setMessage('Confirmation email sent! Check your inbox.');
      }
    } catch (err) {
      setMessage('An unexpected error occurred');
    }
    setLoading(false);
  };

  return(
  <View style={styles.body}>
    <View style={styles.LogCont}>
      <Text style={styles.heading}>
        Email Not Confirmed
      </Text>
      <Text style={styles.Text}>
        Please check your email and click the confirmation link to activate your account.
      </Text>
      <TextInput 
        style={styles.Textinput}
        placeholder="Enter your email to resend"
        placeholderTextColor={colors.subtext}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleResendConfirmation} disabled={loading}>
        <Text style={styles.Text}>
          {loading ? 'SENDING...' : 'RESEND CONFIRMATION'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/Login')}>
        <Text style={styles.Text}>
          BACK TO LOGIN
        </Text>
      </TouchableOpacity>
      <Text style={[styles.Text, { color: colors.error, textAlign: 'center' }]}>
        {message}
      </Text>
    </View>
  </View>);
}