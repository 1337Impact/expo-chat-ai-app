import { styled } from "nativewind";
import React from "react";
import { Image, Pressable, View } from "react-native";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledButton = styled(Pressable);

export default function ProfileIcon() {
  const [open, setOpen] = React.useState(false);
  const handlePress = () => {
    setOpen(!open);
    console.log("Profile Icon Pressed");
  };
  return (
    <StyledView className="flex flex-row items-center">
      <StyledButton onPress={handlePress}>
        <StyledImage
          className="w-10 h-10 rounded-full"
          source={require("../../assets/profile.jpg")}
        />
      </StyledButton>
      <StyledView className="absolute z-20 -bottom-10 w-10 h-10 bg-red ">

      </StyledView>
    </StyledView>
  );
}
