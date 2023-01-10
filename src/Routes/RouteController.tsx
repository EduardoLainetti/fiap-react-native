import "react-native-gesture-handler";
import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { registerRootComponent } from "expo";

import ProductsController from "../Screens/Products/ProductsController";
import DetailController from "../Screens/Detail/DetailController";
import FavoritesController from "../Screens/Favorites/FavoritesController";
import Colors from "../Styles/Colors";

import LoginController from "../Screens/Login/LoginController";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../Store/store";

import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { cleanUser } from "../Store/Login/LoginSlice";
import { TextName } from "./RouteStyles";
import SignUpController from "../Screens/SignUp/SignUpController";

export type RootDrawerParamList = {
  MyPositionDrawer: undefined;
};

export type RootStackParamList = {
  Produtos: undefined;
  Favoritos: undefined;
  Detalhes: { itemID: number; productDetail: string };
  MyPosition: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

let screenOptions: StackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.HeaderBackgroundColor,
  },
  headerTintColor: Colors.HeaderTintColor,
};

export const StackProducts = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Produtos"
        component={ProductsController}
        options={screenOptions}
      />
      <Stack.Screen
        name="Detalhes"
        component={DetailController}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export const StackFavorites = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favoritos"
        component={FavoritesController}
        options={screenOptions}
      />
      <Stack.Screen
        name="Detalhes"
        component={DetailController}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props: any) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.login.user);
  return (
    <DrawerContentScrollView {...props}>
      <TextName>{`${userInfo?.name}`}</TextName>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={() => dispatch(cleanUser())} />
    </DrawerContentScrollView>
  );
};

const RouteController = () => {
  //useManageNotification();
  let drawerNavigation: DrawerNavigationOptions = {
    headerShown: false,
    drawerActiveTintColor: Colors.HeaderTintColor,
    drawerInactiveTintColor: Colors.NeutralMedium,
    drawerStyle: {
      backgroundColor: Colors.HeaderBackgroundColor,
      width: 240,
    },
  };

  const userInfo = useAppSelector((state) => state.login.user);
  if (userInfo && userInfo.token !== "") {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="ProdutosDrawer"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="ProdutosDrawer"
            component={StackProducts}
            options={{ drawerLabel: "Produtos", ...drawerNavigation }}
          />
          <Drawer.Screen
            name="FavoritosDrawer"
            component={StackFavorites}
            options={{ drawerLabel: "Favoritos", ...drawerNavigation }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="MyPosition"
                component={LoginController}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpController}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
};

const RouteControllerManagement = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteController />
      </PersistGate>
    </Provider>
  );
};

export default registerRootComponent(RouteControllerManagement);
