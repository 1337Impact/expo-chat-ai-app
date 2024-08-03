import Markdown from "react-native-markdown-display";
import { SafeAreaView, ScrollView, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function MarkdownMessage({ data }: { data: string }) {
  return (
    <StyledView className="w-full max-w-[80%]">
      <Markdown>{data}</Markdown>
    </StyledView>
  );
}
