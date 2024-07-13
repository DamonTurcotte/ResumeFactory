import {
  RichText,
  Toolbar,
  useEditorBridge,
  CoreBridge,
  PlaceholderBridge,
  ItalicBridge,
  BoldBridge,
  BulletListBridge,
  OrderedListBridge,
  LinkBridge,
  UnderlineBridge,
  StrikeBridge,
  HeadingBridge,
  BlockquoteBridge,
  CodeBridge,
  TaskListBridge,
  ListItemBridge,
  HistoryBridge,
  DEFAULT_TOOLBAR_ITEMS,
} from "@10play/tentap-editor";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";

const ToolbarItems = {
  bold: DEFAULT_TOOLBAR_ITEMS[0],
  italic: DEFAULT_TOOLBAR_ITEMS[1],
  link: DEFAULT_TOOLBAR_ITEMS[2],
  taskList: DEFAULT_TOOLBAR_ITEMS[3],
  heading: DEFAULT_TOOLBAR_ITEMS[4],
  code: DEFAULT_TOOLBAR_ITEMS[5],
  underline: DEFAULT_TOOLBAR_ITEMS[6],
  strike: DEFAULT_TOOLBAR_ITEMS[7],
  blockQuote: DEFAULT_TOOLBAR_ITEMS[8],
  orderedList: DEFAULT_TOOLBAR_ITEMS[9],
  bulletList: DEFAULT_TOOLBAR_ITEMS[10],
  sinkListItem: DEFAULT_TOOLBAR_ITEMS[11],
  liftListItem: DEFAULT_TOOLBAR_ITEMS[12],
  undo: DEFAULT_TOOLBAR_ITEMS[13],
  redo: DEFAULT_TOOLBAR_ITEMS[14],
};

const ToolbarBridges = {
  bold: BoldBridge,
  italic: ItalicBridge,
  link: LinkBridge.extendExtension({
    inclusive: false,
  }).configureExtension({
    autolink: true,
    validate: (href) => /^https?:\/\//.test(href),
  }),
  taskList: TaskListBridge,
  heading: HeadingBridge,
  code: CodeBridge,
  underline: UnderlineBridge,
  strike: StrikeBridge,
  blockQuote: BlockquoteBridge,
  orderedList: OrderedListBridge,
  bulletList: BulletListBridge,
  sinkListItem: ListItemBridge,
  liftListItem: ListItemBridge,
  undo: HistoryBridge,
  redo: HistoryBridge,
};

const TextEditor = ({ tools=[], placeholder='Begin typing...', inputStyle={}, toolbarStyle={}, toolbarContainerStyle={} }) => {
  const [loading, setLoading] = useState(true);

  const bridges = Array.from(new Set(tools.map(tool => ToolbarBridges[tool]))).filter(bridge => bridge);
  const items = Array.from(new Set(tools.map(tool => ToolbarItems[tool]))).filter(item => item);

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    bridgeExtensions: [
      CoreBridge,
      PlaceholderBridge.configureExtension({
        placeholder: placeholder,
      }),
      ...bridges,
    ],
  });

  useEffect(() => {
    if (Object.keys(editor.getEditorState().length === 0)) {
      editor.webviewRef.current.reload();
    }
    setLoading(false);
  }, []);

  return (
    <>
      <RichText
        editor={editor}
        inputStyle={inputStyle}
        style={{display: "flex"}}
        containerStyle={{display: "flex"}}
      />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.toolbarContainer, toolbarContainerStyle]}
          >
          <Toolbar
            editor={editor}
            items={items}
            style={toolbarStyle}
          />
        </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default TextEditor;