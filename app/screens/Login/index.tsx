import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/constant';
import {useForm, Controller} from 'react-hook-form';
import {
  getUserFromLocalStorage,
  storeUserInLocalStorage,
} from '../../hooks/useStorage';
import {useMutation} from '@tanstack/react-query';
import {handleLogin} from '../../utils/util';

type FormValues = {
  email: string;
  password: string;
};

const Login = ({navigation}: any) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: data => handleLogin(data),
    onSuccess: data => {
      if (data?.status === 200) {
        storeUserInLocalStorage(data?.user);
        return navigation.navigate('Dashboard');
      }
    },
  });

  const onSubmit = async (data: any) => await mutation.mutate(data);

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 5}}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 0.4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 20,
          }}>
          <Text style={styles.mainHeading}>Login</Text>
          <Text style={styles.smallHeading}>
            Find the most comfortable place to staycation.
          </Text>
        </View>
        <View style={{flex: 0.6}}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.emailInput}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Enter email"
                value={value}
                autoFocus
                placeholderTextColor={COLORS.blue}
              />
            )}
            name="email"
            rules={{
              required: 'Email is required!',
              pattern: {
                value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                message: 'Invalid email.',
              },
            }}
          />
          {/* @ts-ignore */}
          <Text style={styles.error}>{errors?.email?.message}</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholderTextColor={COLORS.blue}
                style={styles.passwordInput}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Enter password"
                value={value}
              />
            )}
            rules={{
              required: 'Password is required!',
              minLength: {
                value: 8,
                message: 'Password must be min 8 character',
              },
            }}
            name="password"
          />
          {/* @ts-ignore */}
          <Text style={styles.error}>{errors?.password?.message}</Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.registerHeading}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  color: COLORS.darkBlue,
                  fontSize: 16,
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginLeft: 15,
    marginVertical: 10,
  },
  registerHeading: {
    color: COLORS.blue,
    marginVertical: 20,
    marginRight: 5,
    fontSize: 14,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.blue,
    marginVertical: 10,
  },
  smallHeading: {
    fontSize: 15,
    color: '#333',
    marginVertical: 5,
  },
  loginButtonText: {
    color: COLORS.white,
  },
  loginButton: {
    backgroundColor: COLORS.blue,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 30,
  },
  passwordInput: {
    color: COLORS.darkBlue,
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  emailInput: {
    color: COLORS.darkBlue,
    backgroundColor: '#ddd',
    borderRadius: 5,
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
});
