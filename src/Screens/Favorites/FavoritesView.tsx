import React from "react";
import { View, FlatList } from "react-native";

import Colors from "../../Styles/Colors";
import IProduct from "../../Interfaces/IProduct";

import {
  ContainerItem,
  IconFavorite,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextPrice,
  TextsView,
  TextTitle,
} from "./FavoritesStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";

type iProps = {
  dataConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
};

const FavoritesView = ({ dataConnection, isLoading, goToDetail }: iProps) => {
  const RenderItem = ({ item }: { item: IProduct }) => {
    return (
      <ContainerItem
        onPress={() => goToDetail(item)}
        testID={"button" + item._id.toString()}
      >
        <>
          <TextsView>
            <View>
              <TextNameStyle>
                <TextTitle>{item.name.substring(0, 30)}...</TextTitle>
                <TextPrice>R${parseInt(item.price).toFixed(2)}</TextPrice>
                <IconFavorite name="star" size={20} />
              </TextNameStyle>
            </View>
          </TextsView>
        </>
      </ContainerItem>
    );
  };

  let loadingBox = null;
  if (isLoading) {
    loadingBox = (
      <StyledActivityIndicator
        size="large"
        color={Colors.PrimaryDark}
        testID="activityLoading"
      />
    );
  }

  return (
    <MainSafeAreaView>
      <DrawerMenu />
      {loadingBox}
      <FlatList
        data={dataConnection}
        renderItem={({ item }: { item: IProduct }) => (
          <RenderItem item={item} />
        )}
        keyExtractor={(item: IProduct) => item._id.toString()}
        testID="flatListHome"
      />
    </MainSafeAreaView>
  );
};

export default FavoritesView;
