import { useAssets } from "expo-asset";

export const templateFonts = {
  0: ["CrimsonPro", "Genos"],
  1: ["CrimsonPro", "DMSans"],
  2: ["DMSans", "JetBrainsMono"],
  3: ["JetBrainsMono", "NotoSans"],
  4: ["NotoSans", "RedHatText"],
  5: ["RedHatText", "Saira"],
  6: ["Saira", "Genos"],
}

export const getFont = (font) => {
  switch (font) {
    case "Genos":
      return useAssets(getGenos());
    case "CrimsonPro":
      return useAssets(getCrimsonPro());
    case "DMSans":
      return useAssets(getDMSans());
    case "JetBrainsMono":
      return useAssets(getJetBrainsMono());
    case "NotoSans":
      return useAssets(getNotoSans());
    case "RedHatText":
      return useAssets(getRedHatText());
    case "Saira":
      return useAssets(getSaira());
    default:
      return useAssets(getGenos());
  }
}

const getGenos = () => [
  require("../../assets/fonts/Genos/Genos-Regular.ttf"),
  require("../../assets/fonts/Genos/Genos-Italic.ttf"),
  require("../../assets/fonts/Genos/Genos-Medium.ttf"),
  require("../../assets/fonts/Genos/Genos-MediumItalic.ttf"),
  require("../../assets/fonts/Genos/Genos-SemiBold.ttf"),
  require("../../assets/fonts/Genos/Genos-SemiBoldItalic.ttf"),
];

const getCrimsonPro = () => [
  require("../../assets/fonts/CrimsonPro/CrimsonPro-Regular.ttf"),
  require("../../assets/fonts/CrimsonPro/CrimsonPro-Italic.ttf"),
  require("../../assets/fonts/CrimsonPro/CrimsonPro-Medium.ttf"),
  require("../../assets/fonts/CrimsonPro/CrimsonPro-MediumItalic.ttf"),
  require("../../assets/fonts/CrimsonPro/CrimsonPro-SemiBold.ttf"),
  require("../../assets/fonts/CrimsonPro/CrimsonPro-SemiBoldItalic.ttf"),
];

const getDMSans = () => [
  require("../../assets/fonts/DMSans/DMSans-Regular.ttf"),
  require("../../assets/fonts/DMSans/DMSans-Italic.ttf"),
  require("../../assets/fonts/DMSans/DMSans-Medium.ttf"),
  require("../../assets/fonts/DMSans/DMSans-MediumItalic.ttf"),
  require("../../assets/fonts/DMSans/DMSans-SemiBold.ttf"),
  require("../../assets/fonts/DMSans/DMSans-SemiBoldItalic.ttf"),
];

const getJetBrainsMono = () => [
  require("../../assets/fonts/JetBrainsMono/JetBrainsMono-Regular.ttf"),
  require("../../assets/fonts/JetBrainsMono/JetBrainsMono-Italic.ttf"),
  require("../../assets/fonts/JetBrainsMono/JetBrainsMono-Medium.ttf"),
  require("../../assets/fonts/JetBrainsMono/JetBrainsMono-MediumItalic.ttf"),
  require("../../assets/fonts/JetBrainsMono/JetBrainsMono-SemiBold.ttf"),
  require("../../assets/fonts/JetBrainsMono/JetBrainsMono-SemiBoldItalic.ttf"),
];

const getNotoSans = () => [
  require("../../assets/fonts/NotoSans/NotoSans-Regular.ttf"),
  require("../../assets/fonts/NotoSans/NotoSans-Italic.ttf"),
  require("../../assets/fonts/NotoSans/NotoSans-Medium.ttf"),
  require("../../assets/fonts/NotoSans/NotoSans-MediumItalic.ttf"),
  require("../../assets/fonts/NotoSans/NotoSans-SemiBold.ttf"),
  require("../../assets/fonts/NotoSans/NotoSans-SemiBoldItalic.ttf"),
];

const getRedHatText = () => [
  require("../../assets/fonts/RedHatText/RedHatText-Regular.ttf"),
  require("../../assets/fonts/RedHatText/RedHatText-Italic.ttf"),
  require("../../assets/fonts/RedHatText/RedHatText-Medium.ttf"),
  require("../../assets/fonts/RedHatText/RedHatText-MediumItalic.ttf"),
  require("../../assets/fonts/RedHatText/RedHatText-SemiBold.ttf"),
  require("../../assets/fonts/RedHatText/RedHatText-SemiBoldItalic.ttf"),
];

const getSaira = () => [
  require("../../assets/fonts/Saira/Saira-Regular.ttf"),
  require("../../assets/fonts/Saira/Saira-Italic.ttf"),
  require("../../assets/fonts/Saira/Saira-Medium.ttf"),
  require("../../assets/fonts/Saira/Saira-MediumItalic.ttf"),
  require("../../assets/fonts/Saira/Saira-SemiBold.ttf"),
  require("../../assets/fonts/Saira/Saira-SemiBoldItalic.ttf"),
];