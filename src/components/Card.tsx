import { Pressable, Text } from 'react-native';

export function Card({
  title,
  description,
  onPress,
}: {
  title: string;
  description?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={{
        borderWidth: 1,
        padding: 20,
        // width: '70%',
        borderRadius: 10,
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 18 }}>{title}</Text>
      {description && (
        <Text style={{ fontSize: 14, paddingTop: 12 }}>{description}</Text>
      )}
    </Pressable>
  );
}
