import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";

import Colors from "../../Styles/Colors";
import IProduct from "../../Interfaces/IProduct";

import {
  ContainerIconFavorite,
  ContainerItem,
  ContainerItemName,
  IconFavorite,
  IconFavoriteInative,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextPrice,
  TextsView,
  TextTitle,
} from "./ProductsStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";

type iProps = {
  dataConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
  getDataPage: () => void;
};

const ProductsView = ({
  dataConnection,
  isLoading,
  goToDetail,
  getDataPage,
}: iProps) => {
  const RenderItem = ({ item }: { item: IProduct }) => {
    if (item.favorite) {
      return (
        <ContainerItem
          onPress={() => goToDetail(item)}
          testID={"button" + item._id.toString()}
        >
          <>
            <TextsView>
              <View>
                <TextNameStyle
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <ContainerItemName>
                    {item.name.substring(0, 100)}
                  </ContainerItemName>
                  <TextPrice>R${parseInt(item.price).toFixed(2)}</TextPrice>
                  <ContainerIconFavorite>
                    <IconFavorite name="star" size={30} />
                  </ContainerIconFavorite>
                </TextNameStyle>
              </View>
            </TextsView>
          </>
        </ContainerItem>
      );
    } else {
      return (
        <ContainerItem
          onPress={() => goToDetail(item)}
          testID={"button" + item._id.toString()}
        >
          <>
            <TextsView>
              <View>
                <TextNameStyle
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <ContainerItemName>
                    {item.name.substring(0, 100)}
                  </ContainerItemName>
                  <TextPrice>R${parseInt(item.price).toFixed(2)}</TextPrice>
                  <ContainerIconFavorite>
                    <IconFavoriteInative name="star" size={30} />
                  </ContainerIconFavorite>
                </TextNameStyle>
              </View>
            </TextsView>
          </>
        </ContainerItem>
      );
    }
  };

  // let loadingBox = null;
  // if (isLoading) {
  //   loadingBox = (
  //     <StyledActivityIndicator
  //       size="large"
  //       color={Colors.PrimaryDark}
  //       testID="activityLoading"
  //     />
  //   );
  // }

  return (
    <MainSafeAreaView>
      <DrawerMenu />
      <FlatList
        data={dataConnection}
        renderItem={({ item }: { item: IProduct }) => (
          <RenderItem item={item} />
        )}
        keyExtractor={(item: IProduct) => item._id.toString()}
        testID="flatListHome"
        onEndReached={getDataPage}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Loading loading={isLoading} />}
      />
    </MainSafeAreaView>
  );
};

function Loading({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <StyledActivityIndicator size={"large"} color={Colors.PrimaryDark} />
    );
  }
  return null;
}

export default ProductsView;
