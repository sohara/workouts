import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type SelectPickerProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  options: { value: string; label: string }[];
};

export function SelectPicker({
  modalOpen,
  setModalOpen,
  value,
  setValue,
  options,
}: SelectPickerProps) {
  return (
    <Modal
      visible={modalOpen}
      transparent={true}
      animationType="slide"
      animated={true}
    >
      <Pressable
        onPress={() => setModalOpen(false)}
        style={styles.transparentOverlay}
      >
        {/* Other pressable here to prevent parent handler getting called */}
        <Pressable style={styles.pickerContainer}>
          <Pressable onPress={() => setModalOpen(false)}>
            <Text style={{ textAlign: 'center' }}>Close</Text>
          </Pressable>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => {
              setValue(itemValue);
            }}
          >
            {options.map((option) => (
              <Picker.Item
                label={option.label}
                value={option.value}
                key={option.value}
              />
            ))}
          </Picker>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  transparentOverlay: {
    width: '100%',
    position: 'relative',
    height: '100%',
  },
  pickerContainer: {
    width: '100%',
    height: 300,
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowRadius: 40,
    shadowOpacity: 0.3,
  },
});
