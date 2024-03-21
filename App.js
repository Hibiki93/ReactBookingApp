import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import LoginScreen from './apps/screens/LoginScreen';
import AdminHomeScreen from './apps/screens/AdminHomeScreen';
import UserHomeScreen from './apps/screens/UserHomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={AdminHomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Book Appointment" component={UserHomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
});
