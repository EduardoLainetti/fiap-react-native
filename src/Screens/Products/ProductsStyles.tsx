import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../Styles/Colors";

export const MainSafeAreaView = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 30px;
`;

export const ContainerItemName = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  width: 240px;
`;

export const ContainerItem = styled.TouchableHighlight`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 180px;
  background-color: ${colors.PrimaryLightest};
  border-radius: 15px;
  border-width: 1px;
  border-color: ${colors.PrimaryLightest};
  padding: 5px;
  justify-content: center;
`;

export const TextNameStyle = styled.View`
  flex-direction: row;
`;

export const TextsView = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 4px;
`;

export const TextTitle = styled.Text`
  width: 300px;
  font-size: 18px;
  align-self: flex-start;
`;

export const TextPrice = styled.Text`
  margin-left: 10px;
  width: 100px;
  font-size: 18px;
  color: ${colors.NeutralLight};
`;

export const IconFavorite = styled(Icon)`
  color: ${colors.PrimaryDark};
  margin-top: 2px;
`;

export const IconFavoriteInative = styled(Icon)`
  color: ${colors.NeutralMedium};
  margin-top: 2px;
`;

export const ContainerIconFavorite = styled.View`
  width: 30px;
`;
