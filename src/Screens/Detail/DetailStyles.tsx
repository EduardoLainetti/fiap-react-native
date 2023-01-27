import styled from "styled-components/native";
import { Image } from "react-native-elements";
import Colors from "../../Styles/Colors";

export const MainSafeAreaView = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ContainerFavorite = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextName = styled.Text`
  margin: 20px;
  font-size: 25px;
`;

export const TextTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: bold;
  color: ${Colors.PrimaryLightest};
`;

export const TextDetail = styled.Text`
  margin: 10px;
  font-weight: bold;
  font-size: 24px;
  color: ${Colors.NeutralDark};
`;

export const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 30px;
`;
