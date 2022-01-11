import { GestureResponderEvent, Pressable, Text } from 'react-native';

export function CircularButton({ onPress }: { onPress: () => void }) {
  console.warn({ onPress });
  return (
    <Pressable
      style={{
        borderWidth: 2,
        borderRadius: 50,
        padding: 0,
        width: 60,
        height: 60,
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 44 }}>+</Text>
    </Pressable>
  );
}
