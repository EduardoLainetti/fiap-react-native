import React, { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";

import IProduct from "../../Interfaces/IProduct";
import FavoritesView from "./FavoritesView";
import { getFavoritesProducts } from "../../Services/APIs/Products/Products";
import useAPI from "../../Services/APIs/Common/useAPI";
import { useAppSelector } from "../../Store/hooks";

type iProps = StackScreenProps<RootStackParamList, "Favoritos">;

const FavoritesController = ({ route, navigation }: iProps) => {
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProductsGetAPI = useAPI(getFavoritesProducts);
  const userInfo = useAppSelector((state) => state.login.user);

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getDataPage();
    });
    return focusHandler;
    //getDataPage();
  }, [navigation]);

  const getDataPage = async () => {
    setIsLoading(true);
    console.log("Vai consultar os favoritos");
    getProductsGetAPI
      .requestPromise(userInfo?.token)
      .then((data: any) => {
        console.log(JSON.stringify(data));
        setIsLoading(false);
        setDataConnection(data.products);
      })
      .catch((error: string) => {
        console.log("erro ao consultar os favoritos");
        console.log(error);
      });
  };

  const goToDetail = (item: IProduct) => {
    navigation.push("Detalhes", {
      itemID: item._id,
      productDetail: JSON.stringify(item),
    });
  };

  return (
    <FavoritesView
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );
};

export default FavoritesController;
