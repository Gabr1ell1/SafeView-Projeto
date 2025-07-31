import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CadastroUsers from '../telas/CadastroUsers';
import CadastroUsers2 from '../telas/CadastroUsers2'; 

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: true, animation: 'slide_from_right',}}>
      <Stack.Screen name="CadastroUsers" component={CadastroUsers} options={{ title: 'Cadastra-se Aqui!!' }}/>
      <Stack.Screen name="CadastroUsers2" component={CadastroUsers2} options={{ title: 'Finalize seu Cadastro!' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
