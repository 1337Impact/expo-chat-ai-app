import { styled } from "nativewind";
import { Image, View as RNView } from "react-native";
import { Text as RNText } from "react-native";
import MarkdownMessage from "./MarkdownMessage";

const View = styled(RNView);
const Text = styled(RNText);
const StyledImage = styled(Image);

export default function Message({
  data,
  isRes = false,
}: {
  data: string;
  isRes?: boolean;
}) {
  return isRes ? (
    <View className="items-start flex flex-row my-4">
      <StyledImage
        className="w-10 h-10 rounded-full"
        source={require('../../assets/teacher.png')}
      />
      <MarkdownMessage data={data} />
    </View>
  ) : (
    <View className="items-end">
      <View className="max-w-[70%] rounded-xl py-1 px-3 mt-2 bg-gray-300">
        <Text className="">{data}</Text>
      </View>
    </View>
  );
}
