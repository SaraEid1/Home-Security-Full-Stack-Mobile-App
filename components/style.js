import styled from "styled-components";
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity} from 'react-native';

//const statusBarHeight = Constants.statusBarHeight;

export const StyledContainer = styled.View`
flex:1;
padding : 25px;
`

export const InnerContainer = styled.View`
flex:1;
width : 100%;
aligh-items: center;
`;

export const PageTitle = styled.Text`
font-size : 30px;
text-align: center;
font-weight: bold;
padding:10:px;
`;

export const SubTitle = styled.Text`
font-size : 18px;
margin-bottom: 20px;
letter-spacing: 1px
font-weight: bold;
padding:10:px;
`;

export const StyledFormArea = styled.View`
width: 85%;
`;

export const StyledTextInput = styled.TextInput`
 padding: 15px;
 padding-left: 55px;
 padding-right: 55px;
 border-radius: 5px;
 font-size: 16px;
 height: 60px;
 margin-vertical: 3px;
 margin-bottom: 10px;
 color: ${'#000000'};
 borderColor: ${'#939EA6'};
 borderWidth: 1;
`;

export const StyledInputLabel = styled.Text`
font-size: 16px;
text-align: left;
color: ${'#304A68'};
font-weight: bold;
`;

export const LeftIcon = styled.View`
left: 15px;
top: 40px;
position: absolute;
z-index:1;
color: ${'#939EA6'};
`;

export const RightIcon = styled.TouchableOpacity`
right: 15px;
top: 38px;
position: absolute;
z-index:1;
color: ${'#939EA6'};
`;

export const StyledButton = styled.TouchableOpacity`

backgroundColor: ${'#494B7A'};
width: 300;
height: 50;
alignItems: ${'center'};
justifyContent: ${'center'};
marginHorizontal: 25;
marginTop: 10;
borderRadius: 8;
`;

export const ButtonText = styled.Text`
font-size: 18px;
color: ${'#fff'};
font-weight: bold;
`;

export const MsgBox =styled.Text`
text-align: center;
font-size: 13px;
`;

export const ExtraView = styled.View`
justify-content: center;
flex-direction: row;
align-items: center;
padding: 10px;
`;

export const ExtraText = styled.Text`
justify-content: center;
align-content: center;
font-size: 15px; 
`;

export const TextLink = styled.TouchableOpacity`
justify-content: center;
align-items: center;

`;

export const TextLinkContent = styled.Text`
font-size: 15px;
color: ${'#494B7A'};
font-weight: bold;
`;

export const PopUpText = styled.Text`
marginVertical: 30;
fontSize: 20;
textAlign: ${'center'};
color: ${'#3C3A36'};
font-weight: bold;
margin-bottom: 50;
margin-top: 10;
`;

export const StyledPopUpButton = styled.TouchableOpacity`

backgroundColor: ${'#11A899'};
width: 110;
height: 40;
justifyContent: center;
align-items: center;
borderRadius: 6;
`;

export const StyledPopUpButton1 = styled.TouchableOpacity`

backgroundColor: ${'#E01E1E'};
width: 110;
height: 40;
justifyContent: center;
align-items: center;
marginHorizontal: 55;
borderRadius: 6;
`;

export const ButtonTextPopUp = styled.Text`
font-size: 16px;
color: ${'#fff'};
font-weight: bold;
`;
