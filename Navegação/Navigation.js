import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TelaLogin from "../screens/telaLogin";
import Cadastro from "../screens/Cadastro";
import Menu from "../screens/Menu";
import Lista from "../views/Lista";
import Deletar from "../views/Deletar";
import Atualizar from "../views/Atualizar";
import NovoCadastro from "../views/NovoCadastro";


const stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Login" component={TelaLogin} />
        <stack.Screen name="Cadastro" component={Cadastro} />
        <stack.Screen name="Menu" component={Menu} />
        <stack.Screen name="Lista" component={Lista} />
        <stack.Screen name="Deletar" component={Deletar} />
        <stack.Screen name="Atualizar" component={Atualizar} />
        <stack.Screen name="NovoCadastro" component={NovoCadastro}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
