import { TextInput, useTheme } from "react-native-paper";

export const TextArea = ({label, value, onChangeText, style={}, placeholder=null}) => {
  const theme = useTheme();

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      multiline={true}
      numberOfLines={4}
      style={[{ marginVertical: 3, backgroundColor: theme.colors.backdrop }, style]}
      placeholder={placeholder}
    />
  );
}