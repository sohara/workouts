import React from 'react';
import { Pressable, Text } from 'react-native';

export function Button({
  onPress,
  title,
  disabled,
}: {
  disabled: boolean;
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => ({
        borderWidth: 1,
        padding: 10,
        backgroundColor: pressed ? '#333' : disabled ? '#999' : '#fff',
      })}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text style={{ fontSize: 18, color: pressed ? '#fff' : '#000' }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
