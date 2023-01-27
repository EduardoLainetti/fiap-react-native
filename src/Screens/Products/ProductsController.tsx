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
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);

  const getProductsGetAPI = useAPI(getAllProducts);
  const userInfo = useAppSelector((state) => state.login.user);

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      setDataConnection([]);
      setPage(1);
      setHasMoreData(true);
      getDataPage();
    });
    return focusHandler;
    //getDataPage();
  }, [navigation]);

  const getDataPage = async () => {
    if (!hasMoreData) return;
    setIsLoading(true);
    let requestParam: IParamGetProducts = {
      page: page,
      perPage: 10,
      orderDirection: "asc",
    };
    getProductsGetAPI
      .requestPromise(requestParam, userInfo?.token)
      .then((data: any) => {
        console.log(JSON.stringify(data));
        setIsLoading(false);
        if (data.products.length > 0) {
          const current = data.products;
          setDataConnection((prev) => [...prev, ...current]);
          setPage((prev) => prev + 1);
        } else {
          setHasMoreData(false);
        }
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
      getDataPage={getDataPage}
    />
  );
};

export default ProductsController;
