import React, { useState } from "react";
import LoginView from "./LoginView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getLogin, IParamGetLogin } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";

import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { setUser } from "../../Store/Login/LoginSlice";

import { object, string, number, date, InferType } from "yup";

const LoginController = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getLoginAPI = useAPI(getLogin);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const loginSchema = object({
    email: string()
      .email("Formato de email inválido")
      .required("Login é obrigatório"),
    password: string().required(),
  });

  const makeLogin = async () => {
    console.log("Loading Products - " + login + " - " + password);

    let info: IParamGetLogin = {
      email: login,
      password: password,
    };

    try {
      await loginSchema.validate(info);
    } catch (err: any) {
      console.log("Erro de validação do formulário");
      console.log(err.errors);
      return;
    }

    setIsLoadingAuth(true);

    getLoginAPI
      .requestPromise("", info)
      .then((user: IUserInfo) => {
        if (user.token) {
          dispatch(setUser({ user }));
          setIsLoadingAuth(false);
        } else {
          console.log("Retornou erro");
          console.log(user);
          setIsLoadingAuth(false);
        }
      })
      .catch((error: any) => {
        console.log("Retornou erro");
        console.log(error);
        setIsLoadingAuth(false);
      });
  };

  const submitForm = () => {
    makeLogin();
    //makeLogin("gabi@teste.com", "123456");
    //makeLogin("rubens@schoolguardian.app", "123456");
  };

  return (
    <LoginView
      submitForm={submitForm}
      isLoadingAuth={isLoadingAuth}
      setLogin={setLogin}
      setPassword={setPassword}
    />
  );
};

export default LoginController;
