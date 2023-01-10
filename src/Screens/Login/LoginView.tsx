import { Link } from "@react-navigation/native";
import React from "react";

import { Input } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {
  BottomButton,
  BottomScreen,
  FrontImageBackground,
  LabelLogin,
  LoginBox,
  LogoDiv,
  MainContainer,
  StyledButton,
  StyledImageBackground,
  TopScreen,
} from "./LoginStyles";

type IProps = {
  isLoadingAuth: boolean;
  submitForm: () => void;
  setLogin: (login: string) => void;
  setPassword: (password: string) => void;
};
const LoginView = ({
  submitForm,
  isLoadingAuth,
  setLogin,
  setPassword,
}: IProps) => {
  let loginButton = <StyledButton title="Login" onPress={submitForm} />;
  if (isLoadingAuth) {
    loginButton = <ActivityIndicator size="large" color="#163a85" />;
  }
  return (
    <MainContainer>
      <StyledImageBackground
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVN1dbFlZHTdSw7xD42_BdZpEC93ApDvv7g&usqp=CAU",
        }}
        resizeMode="cover"
      >
        <FrontImageBackground>
          <TopScreen>
            <LogoDiv>Games</LogoDiv>
          </TopScreen>
          <BottomScreen>
            <LoginBox>
              <LabelLogin>Login</LabelLogin>
              <Input
                placeholder="email@email.com"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: "#163a85",
                }}
                placeholderTextColor={"#999"}
                onChangeText={(value) => setLogin(value)}
                autoCompleteType="email"
              />
              <LabelLogin>Senha</LabelLogin>
              <Input
                placeholder="ABCabc1234"
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#163a85",
                }}
                secureTextEntry={true}
                placeholderTextColor={"#999"}
                onChangeText={(value) => setPassword(value)}
                autoCompleteType="password"
              />
              <BottomButton>{loginButton}</BottomButton>
              <Link style={{ textAlign: "center" }} to={{ screen: "SignUp" }}>
                Faça seu cadastro
              </Link>
            </LoginBox>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

export default LoginView;
