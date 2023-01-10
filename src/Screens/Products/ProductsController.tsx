import React, { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";

import IProduct from "../../Interfaces/IProduct";
import ProductsView from "./ProductsView";
import {
  getAllProducts,
  IParamGetProducts,
} from "../../Services/APIs/Products/Products";
import useAPI from "../../Services/APIs/Common/useAPI";
import { useAppSelector } from "../../Store/hooks";

type iProps = StackScreenProps<RootStackParamList, "Produtos">;

const ProductsController = ({ route, navigation }: iProps) => {
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProductsGetAPI = useAPI(getAllProducts);
  const userInfo = useAppSelector((state) => state.login.user);

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getDataPage();
    });
    return focusHandler;
    //getDataPage();
  }, [navigation]);

  let requestParam: IParamGetProducts = {
    page: 0,
    perPage: 5,
    orderDirection: "asc",
  };

  const getDataPage = async () => {
    setIsLoading(true);
    getProductsGetAPI
      .requestPromise(requestParam, userInfo?.token)
      .then((data: any) => {
        console.log(JSON.stringify(data));
        setIsLoading(false);
        setDataConnection(data.products);
      })
      .catch((error: string) => {
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
    <ProductsView
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );
};

export default ProductsController;
