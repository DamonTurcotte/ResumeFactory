export const getFontFaces = (fonts, fontFiles) => {
  let fontFaces = '';
  for (let i = 0; i < fonts.length; i++) {
    if (fontFiles[i]) {
      fontFaces += `
        @font-face { font-family: '${fonts[i]}'; src: url(${fontFiles[i][0].localUri}) format('truetype'); font-weight: 400; font-style: normal; }
        @font-face { font-family: '${fonts[i]}'; src: url(${fontFiles[i][1].localUri}) format('truetype'); font-weight: 400; font-style: italic; }
        @font-face { font-family: '${fonts[i]}'; src: url(${fontFiles[i][2].localUri}) format('truetype'); font-weight: 500; font-style: normal; }
        @font-face { font-family: '${fonts[i]}'; src: url(${fontFiles[i][3].localUri}) format('truetype'); font-weight: 500; font-style: italic; }
        @font-face { font-family: '${fonts[i]}'; src: url(${fontFiles[i][4].localUri}) format('truetype'); font-weight: 600; font-style: normal; }
        @font-face { font-family: '${fonts[i]}'; src: url(${fontFiles[i][5].localUri}) format('truetype'); font-weight: 600; font-style: italic; }
      `;
    }
  }
  return fontFaces;
};