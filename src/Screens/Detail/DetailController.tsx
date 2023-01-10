import React, { useEffect, useState } from "react";
import DetailView from "./DetailView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import { IProductDetails } from "../../Interfaces/IProductDetails";

import useAPI from "../../Services/APIs/Common/useAPI";
import { useAppSelector } from "../../Store/hooks";
import {
  getProductDetails,
  manageProductFavorite,
} from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
import IManageFavorites from "../../Interfaces/IManageFavorites";

import qs from "qs";

type iProps = StackScreenProps<RootStackParamList, "Detalhes">;

const DetailController = ({ navigation, route }: iProps) => {
  const manageProductFavoriteAPI = useAPI(manageProductFavorite);
  const getProductDetailsGetAPI = useAPI(getProductDetails);
  const userInfo = useAppSelector((state) => state.login.user);

  const getDetails = async () => {
    setIsLoading(true);
    getProductDetailsGetAPI
      .requestPromise(objectItem?._id, userInfo?.token)
      .then((data: any) => {
        console.log(JSON.stringify(data));
        setIsLoading(false);
        setDataConnection(data.product);
      })
      .catch((error: string) => {
        console.log(error);
      });
  };

  const [dataConnection, setDataConnection] = useState<IProductDetails>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toggleSwitch = async () => {
    //let data: IManageFavorites = { productID: dataConnection?._id };
    setIsLoading(true);
    manageProductFavoriteAPI
      .requestPromise(
        "",
        qs.stringify({ productID: dataConnection?._id }),
        userInfo!.token
      )
      .then((data: any) => {
        console.log("Dados de favorito atualizados");
        getDetails();
      })
      .catch((error: string) => {
        console.log("Não foi possível atualizar os dados do favorito");
        console.log(error);
      });
  };
  let objectItem: IProduct | null = null;

  if (route && route.params) {
    const { productDetail } = route.params;
    objectItem = JSON.parse(productDetail) as IProduct;

    useEffect(() => {
      getDetails();
    }, []);
  }

  return (
    <DetailView
      dataConnection={dataConnection}
      toggleSwitch={toggleSwitch}
      isLoading={isLoading}
    />
  );
};

export default DetailController;
