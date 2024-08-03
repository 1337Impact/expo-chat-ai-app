import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { styled } from "nativewind";
import { NativeWindStyleSheet } from "nativewind";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Ionicons from "@expo/vector-icons/Ionicons";

import Message from "../components/message/message";
import Navbar from "../components/navbar/navbar";
import { getData, storeData } from "../utils/localStorage";

interface Message {
  text: string;
  isRes: boolean;
}

NativeWindStyleSheet.setOutput({
  default: "native",
});

const StyledImage = styled(Image);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Pressable);
const StyledTextInput = styled(TextInput);
const StyledFlatList = styled(FlatList);

// const apiUrl = process.env.EXPO_PUBLIC_GIMINI_API_URL;
const apiKey = process.env.EXPO_PUBLIC_GIMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chat = model.startChat({
  history: [], // Start with an empty history
  generationConfig: {
    maxOutputTokens: 500,
  },
});
export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const flatListRef = React.useRef<FlatList<Message>>(null);
  
  React.useEffect(() => {
    getData("messages").then((data) => {
      if (data) {
        setMessages(data);
      }
    });
  }, []);
  

  React.useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [messages, flatListRef]);

  async function onSubmit() {
    if (!value || value.trim() === "") {
      console.log("onSubmit: empty value");
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: value, isRes: false },
    ]);
    (async () => {
      setLoading(true);
      const result = await chat.sendMessage(value);
      const response = await result.response;
      const text = await response.text();
      console.log("onSubmit: ", value);
      console.log("response: ", response.text());
      return text;
    })().then((text) => {
      setLoading(false);
      storeData("messages", [...messages, { text: value, isRes: false }, { text: text, isRes: true }]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: text, isRes: true },
      ]);
    });
    setValue("");
  }

  return (
      <StyledView className="bg-gray-100 h-full w-full max-w-[1200px] mx-auto">
        <StyledView className="flex-1">
          <StyledFlatList
            ref={flatListRef}
            className="px-2"
            data={messages}
            // @ts-ignore
            renderItem={({
              item,
            }: {
              item: { isRes: boolean; text: string };
            }) => <Message isRes={item.isRes} data={item.text} />}
            ListFooterComponent={() =>
              loading ? (
                <StyledView className="mb-4 items-start flex flex-row">
                  <StyledImage
                    className="w-10 h-10 rounded-full"
                    source={require("../assets/teacher.png")}
                  />
                  <ActivityIndicator size="large" />
                </StyledView>
              ) : null
            }
          />
        </StyledView>
        <StyledView className="flex flex-row justify-between bg-red-300 border-2 rounded-full mx-4 mb-4">
          <StyledTextInput
            value={value}
            onChangeText={(value) => setValue(value)}
            className="w-[80%] p-1 px-2 "
            placeholder="Message me"
          ></StyledTextInput>
          <StyledButton
            className="w-[40px] h-[40px] m-1 rounded-full items-center justify-center bg-black"
            onPress={onSubmit}
          >
            <Ionicons name="send" size={24} color="white" />
          </StyledButton>
        </StyledView>
      </StyledView>
  );
}