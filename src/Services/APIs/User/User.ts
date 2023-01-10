import ISignUpRequest from "../../../Interfaces/ISignUpRequest";
import api from "../Common/api";

const getLogin = (url: string, data: any) =>  api.post(url + "storeProducts/login", data);

type IParamGetLogin = {
  email: string;
  password: string;
};

const putSignUp = (url: string, data: ISignUpRequest) => api.put(url + "storeProducts/signup", data);

export { getLogin, putSignUp, IParamGetLogin };
