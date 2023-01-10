import { Link } from "@react-navigation/native";
import React from "react";

import { Input } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {
  BottomScreen,
  FrontImageBackground,
  LabelSignUp,
  LogoDiv,
  MainContainer,
  SignUpBox,
  StyledButton,
  StyledImageBackground,
  TopScreen,
  BottomButton,
} from "./SignUpStyles";

type IProps = {
  isLoadingAuth: boolean;
  submitForm: () => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
};

const SignUpView = ({
  submitForm,
  isLoadingAuth,
  setName,
  setEmail,
  setPhone,
  setPassword,
}: IProps) => {
  let signUpButton = <StyledButton title="Cadastro" onPress={submitForm} />;
  if (isLoadingAuth) {
    signUpButton = <ActivityIndicator size="large" color="#163a85" />;
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
            <SignUpBox>
              <LabelSignUp>Nome</LabelSignUp>
              <Input
                placeholder="nome"
                leftIcon={{
                  type: "font-awesome",
                  name: "id-card",
                  color: "#163a85",
                }}
                placeholderTextColor={"#999"}
                onChangeText={(value) => setName(value)}
                autoCompleteType="name"
              />
              <LabelSignUp>Email</LabelSignUp>
              <Input
                placeholder="email@email.com"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: "#163a85",
                }}
                placeholderTextColor={"#999"}
                onChangeText={(value) => setEmail(value)}
                autoCompleteType="email"
              />
              <LabelSignUp>Telefone</LabelSignUp>
              <Input
                placeholder="telefone"
                leftIcon={{
                  type: "font-awesome",
                  name: "phone",
                  color: "#163a85",
                }}
                onChangeText={(value) => setPhone(value)}
                placeholderTextColor={"#999"}
                autoCompleteType="name"
              />
              <LabelSignUp>Senha</LabelSignUp>
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
              <BottomButton>{signUpButton}</BottomButton>
            </SignUpBox>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

export default SignUpView;
