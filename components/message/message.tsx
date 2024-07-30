import { styled } from "nativewind";
import { View as RNView } from "react-native";
import { Text as RNText } from "react-native";

const View = styled(RNView);
const Text = styled(RNText);

export default function Message({ data }: { data: string }) {
  return (
    <View className="border-2 rounded-md p-2 mt-2 bg-gray-200">
      <Text className="text-lg" >{data}</Text>
    </View>
  );
}
