import { TextInput, useTheme } from "react-native-paper";

export const TextBox = ({label, value, onChangeText, style=null, close=null, textContentType="none", inputMode=null, placeholder="" }) => {
  const theme = useTheme();

  return (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    mode="outlined"
    textContentType={textContentType}
    inputMode={inputMode}
    placeholder={placeholder}
    contentStyle={{backgroundColor: theme.colors.backdrop}}
    style={style}
    right={close !== null ? <TextInput.Icon
      forceTextInputFocus={false}
      icon="close"
      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
      size={16}
      onPress={close}
      /> : undefined
    }
  />
);}