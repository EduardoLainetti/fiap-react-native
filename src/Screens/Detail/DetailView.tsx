import React from "react";
import { ScrollView, Switch } from "react-native";

import {
  TextName,
  TextTitle,
  TextDetail,
  TextNoInfo,
  StyledImage,
  StyledActivityIndicator,
  MainSafeAreaView,
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
        <ScrollView>
          <TextName>{dataConnection?.name}</TextName>
          <TextTitle>Preço</TextTitle>
          <TextDetail>{dataConnection?.price}</TextDetail>
          <TextTitle>Favorito</TextTitle>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={dataConnection?.favorite ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={dataConnection?.favorite}
          />
        </ScrollView>
      </MainSafeAreaView>
    );
  }
};

export default DetailView;
