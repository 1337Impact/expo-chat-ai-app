import React from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { styled } from "nativewind";

import { NativeWindStyleSheet } from "nativewind";
import Message from "./components/message/message";
import { GoogleGenerativeAI } from "@google/generative-ai";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);
const StyledTextInput = styled(TextInput);
const StyledFlatList = styled(FlatList);

// const apiUrl = process.env.EXPO_PUBLIC_GIMINI_API_URL;
const apiKey = process.env.EXPO_PUBLIC_GIMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default function App() {
  const [value, setValue] = React.useState("");
  const [messages, setMessages] = React.useState<string[]>(["hello", "hello how are you doing", "I am doing good", "I am doing good too"]);


  async function onSubmit() {
    if (!value || value.trim() === "") {
      console.log("onSubmit: empty value");
      return;
    }
    const data ={
      contents: [{
        parts: [{
          text: "you are a doctor, answer this question: " + value
        }]
      }]
    };
    const result = await model.generateContent(value);
    const response = await result.response;
    const text = response.text();
    console.log("response: ", response.text());
    console.log("onSubmit: ", value);
    setMessages([...messages, value, text]);
    setValue("");
  }

  return (
    <StyledView className="bg-red-100 h-full w-full dark:bg-gray-900">
      <StyledView className="flex-1 mt-20">
        <StyledFlatList
          className="px-2"
          data={messages}
          renderItem={({ item }) => <Message data={item as string} />}
        />
      </StyledView>
      <StyledView className="flex flex-row justify-between border-2 rounded-md mx-4 mb-4">
        <StyledTextInput
          value={value}
          onChangeText={(value) => setValue(value)}
          className="w-[80%] p-1 px-1"
          placeholder="Message me"
        ></StyledTextInput>
        <StyledButton
          className="w-[20%] rounded-md bg-black"
          title="Send"
          onPress={onSubmit}
        ></StyledButton>
      </StyledView>
    </StyledView>
  );
}
