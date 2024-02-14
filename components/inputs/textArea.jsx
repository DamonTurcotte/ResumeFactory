import { TextInput } from "react-native-paper";

export const TextArea = ({label, value, onChangeText, style={}, placeholder=null}) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    mode="outlined"
    multiline={true}
    numberOfLines={4}
    style={[{ marginVertical: 3 }, style]}
    placeholder={placeholder}
  />
);