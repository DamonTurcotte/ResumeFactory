import { TextInput } from "react-native-paper";

export const TextBox = ({label, value, onChangeText, style={}, close=null}) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    mode="outlined"
    style={style}
    right={close !== null ? <TextInput.Icon
        icon="close"
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        size={16}
        onPress={close}
      /> : undefined
    }
  />
);

export const TextArea = ({label, value, onChangeText, style={}}) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    mode="outlined"
    multiline={true}
    numberOfLines={3}
    style={[{ marginVertical: 3 }, style]}
  />
);