import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { styled } from "nativewind";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);
const StyledTextInput = styled(TextInput);

export default function App() {
  return (
    <StyledView className="bg-red-100 h-full">
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="text-lg">
          msgs
        </StyledText>
      </StyledView>
      <StyledView className="flex flex-row justify-between border-2 rounded-md mx-4 mb-4">
        <StyledTextInput className="w-[80%] p-1 px-2" placeholder="Message me"></StyledTextInput>
        <StyledButton className="w-[20%] rounded-md bg-black" title="Send" onPress={() => {}}></StyledButton>
      </StyledView>
    </StyledView>
  );
}
