import { Pressable, Text } from 'react-native';

export function Card({ text }: { text: string }) {
  return (
    <Pressable
      style={{
        borderWidth: 1,
        padding: 20,
        width: '70%',
        borderRadius: 10,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 18 }}>{text}</Text>
    </Pressable>
  );
}
