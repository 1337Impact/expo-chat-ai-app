import { styled } from "nativewind";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack"; // Import the type NativeStackHeaderProps

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);

export default function Navbar({ navigation, options, back }: NativeStackHeaderProps) {
  return (
    <StyledView className="flex flex-row w-full h-24 bg-red-300 px-2 items-center pt-6">
        <StyledImage
        className="w-10 h-10 mr-2"
        source={require('../../assets/teacher.png')}
      />
      <StyledText className="text-xl text-gray-800 font-bold">
        Your Ai Teacher
      </StyledText>
    </StyledView>
  );
}
