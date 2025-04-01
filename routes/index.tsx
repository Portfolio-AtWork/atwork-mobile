import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PrivateRoute } from "~/components/auth/PrivateRoute";
import { HistoryScreen } from "~/pages/HistoryPage/HistoryScreen";
import { LoginScreen } from "~/pages/LoginScreen";

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="History"
          component={() => (
            <PrivateRoute>
              <HistoryScreen />
            </PrivateRoute>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
