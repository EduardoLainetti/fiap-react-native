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

export const ContainerItem = styled.TouchableHighlight`
  margin-bottom: 10px;
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
  width: 280px;
  font-size: 18px;
  align-self: flex-start;
`;

export const TextPrice = styled.Text`
  width: 100px;
  font-size: 18px;
`;

export const IconFavorite = styled(Icon)`
  color: ${colors.PrimaryDark};
  margin-top: 2px;
`;
