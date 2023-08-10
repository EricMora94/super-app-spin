import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { CustomNavBar } from '../index'
import { HomeScreen } from '../screens/Home/HomeScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen/LoyaltyScreen';
import MovementsScreen from '../screens/Movements/MovementsScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import useTheme from '../../femsaComponents/hooks/useTheme';
import { Movement } from '../models/Movement';
import ExchangePoints from '../screens/ExchangePoints/ExchangePointsScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMovementsContext } from '../context/SuperAppContext';
import BalanceScreen from '../screens/Balance/BalanceScreen';
import DetailssScreen from '../screens/Movements/detailsmovements/MovementsDetailsScreens';
import AccountDetails from '../screens/account/accountScreen';






export type RootStackParamList = {
  Home: undefined,
  Beneficios: undefined,
  Cartera: undefined,
  Cuenta: undefined,
  Movimientos: undefined,
  Detalles: { movement: Movement };

};

interface BackButton {
  onPress: () => void
}


const BackButton: React.FC<BackButton> = ({ onPress }) => {
  return <TouchableOpacity
    style={{ marginLeft: 24 }}
    onPress={() => {
      onPress()
    }}
  >
    <Image source={require('../assets/Navigation/BackButton.png')} />
  </TouchableOpacity>
}

const Navigation = () => {
  const { colors } = useTheme()
  const { state, dispatch } = useMovementsContext()
  const navigation = useNavigation();

  const StackNavigation = () => {


    return (
      <Stack.Navigator >
        <Stack.Screen name="Beneficios" component={LoyaltyScreen}
          options={{
            headerTitleAlign: 'left',
            headerTitleStyle: { fontWeight: '500', fontSize: 18, lineHeight: 24 }
          }} />
        <Stack.Screen name="Movimientos" component={MovementsScreen}
          options={{
            headerLeft: (props) => (
              <BackButton onPress={() => {
                navigation.navigate('Beneficios');
                dispatch({ type: 'SHOW_TAB', payload: true })
              }} />
            ),
            headerTitleAlign: 'left',
            headerTitleStyle: { fontWeight: '500', fontSize: 18, lineHeight: 24 }
          }} />
        <Stack.Screen name="Exchange" component={ExchangePoints}
          options={{
            headerLeft: (props) => (
              <BackButton onPress={() => {
                navigation.navigate('Beneficios');
                dispatch({ type: 'SHOW_TAB', payload: true })
              }} />
            ),
            headerTitleAlign: 'left',
            title: 'Cambia tus puntos',
            headerTitleStyle: { fontWeight: '500', fontSize: 18, lineHeight: 24 }
          }} />
        <Stack.Screen name="Balance" component={BalanceScreen}
          options={{
            headerLeft: (props) => (
              <BackButton onPress={() => {
                navigation.navigate('Exchange');
                dispatch({ type: 'SHOW_TAB', payload: true })
              }} />
            ),
            headerTitleAlign: 'left',
            title: 'Cambia tus puntos',
            headerTitleStyle: { fontWeight: '500', fontSize: 18, lineHeight: 24 }
          }} />
        <Stack.Screen name="Detalle del Movimiento" component={DetailssScreen}
          options={{
            headerLeft: (props) => (
              <BackButton onPress={() => {
                navigation.navigate('Movimientos');
                dispatch({ type: 'SHOW_TAB', payload: false })
              }} />
            ),
            headerTitleAlign: 'left'
          }} />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator tabBar={(props) => (state.tabBar ? <CustomNavBar {...props} focusedColor={colors.content_primary} blurColor={colors.content_tertiary} /> : null)}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: { fontWeight: '500', fontSize: 18, lineHeight: 24 }
        }}
      />
      <Tab.Screen
        name="Benefits"
        options={{
          headerShown: false
        }}
        component={StackNavigation}
      />
      <Tab.Screen
        name="Cartera"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: { fontWeight: '500', fontSize: 18, lineHeight: 24 }
        }}
      />
      <Tab.Screen
        name="Cuenta"
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: { fontWeight: '500', fontSize: 18, lineHeight: 24 }
        }}
        component={AccountDetails}

      />
    </Tab.Navigator>
  );
};

export default Navigation;