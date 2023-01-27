import React from "react";
import { ScrollView, Switch } from "react-native";

import {
  TextName,
  TextTitle,
  TextDetail,
  StyledActivityIndicator,
  MainSafeAreaView,
  ContainerFavorite,
} from "./DetailStyles";
import { IProductDetails } from "../../Interfaces/IProductDetails";
import Colors from "../../Styles/Colors";

type iProps = {
  dataConnection: IProductDetails | null;
  isLoading: boolean;
  toggleSwitch: () => void;
};

const DetailView = ({ dataConnection, toggleSwitch, isLoading }: iProps) => {
  let loadingBox = null;
  if (isLoading) {
    return (
      <MainSafeAreaView>
        <StyledActivityIndicator
          size="large"
          color={Colors.PrimaryDark}
          testID="activityLoading"
        />
      </MainSafeAreaView>
    );
  } else {
    return (
      <MainSafeAreaView>
        <TextName>{dataConnection?.name}</TextName>
        <TextTitle>Preço</TextTitle>
        <TextDetail>{dataConnection?.price?.toFixed(2)}</TextDetail>
        <ContainerFavorite>
          <TextTitle>Favorito</TextTitle>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={
              dataConnection?.favorite ? Colors.PrimaryDark : "#f4f3f4"
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={dataConnection?.favorite}
          />
        </ContainerFavorite>
      </MainSafeAreaView>
    );
  }
};

export default DetailView;
