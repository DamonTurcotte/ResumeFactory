import { TextInput } from "react-native-paper";

export const TextBox = ({label, value, onChangeText, style=null, close=null, textContentType="none"}) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    mode="outlined"
    style={style}
    textContentType={textContentType}
    right={close !== null ? <TextInput.Icon
        forceTextInputFocus={false}
        icon="close"
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        size={16}
        onPress={close}
      /> : undefined
    }
  />
);