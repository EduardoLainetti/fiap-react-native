import React, { useState } from "react";
import useAPI from "../../Services/APIs/Common/useAPI";
import { putSignUp } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";

import { setUser } from "../../Store/Login/LoginSlice";
import SignUpView from "./SignUpView";
import ISignUpRequest from "../../Interfaces/ISignUpRequest";

const SignUpController = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const putSignUpAPI = useAPI(putSignUp);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const signUpUser = () =>
    // name: string,
    // phone: string,
    // email: string,
    // password: string
    {
      let request: ISignUpRequest = {
        name,
        phone,
        email,
        password,
      };
      setIsLoadingAuth(true);

      putSignUpAPI
        .requestPromise("", request)
        .then((user: IUserInfo) => {
          setIsLoadingAuth(false);
          alert("Cadastro realizado com sucesso!");
        })
        .catch((error: any) => {
          console.log("Retornou erro");
          console.log(error);
          setIsLoadingAuth(false);
        });
    };

  const submitForm = () => {
    signUpUser();
    //signUpUser("Eduardo", "6112345678", "eduardo@teste.com", "123456");
  };

  return (
    <SignUpView
      submitForm={submitForm}
      isLoadingAuth={isLoadingAuth}
      setName={setName}
      setEmail={setEmail}
      setPhone={setPhone}
      setPassword={setPassword}
    />
  );
};

export default SignUpController;
