import { useRef, useState, useCallback } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

import { getFont } from "./getFont";

export const TemplateView = ({ fonts, size='letter', style={} }) => {
  const [font1] = getFont(fonts[0]);
  const [font2] = fonts.length > 1 ? getFont(fonts[1]) : [null];
  const [font3] = fonts.length > 2 ? getFont(fonts[2]) : [null];

  const [webViewDimensions, setWebViewDimensions] = useState({ width: 0, height: 0 });

  const viewRef = useRef(null);
  const webViewRef = useRef(null);

  const templateViewDimensions = {
    letter: { width: 8.5, height: 11 },
    A4: { width: 8.27, height: 11.69 },
  };

  const onLayout = useCallback(event => {
    viewRef.current.measure((x, y, width, height, pageX, pageY) => {
      // set the dimensions of the WebView to fit within the View with an aspect ratio of templateViewDimensions[size]
      const aspectRatio = templateViewDimensions[size].width / templateViewDimensions[size].height;
      const newWidth = Math.min(width, height * aspectRatio);
      const newHeight = newWidth / aspectRatio;
      setWebViewDimensions({ width: newWidth, height: newHeight });
    }
  )}, [size]);

  return (
    <View
      onLayout={onLayout}
      ref={viewRef}
      style={style}
    >
      <View
        style={{
          width: webViewDimensions.width,
          height: webViewDimensions.height,
        }}
      >
      { font1 !== null && ( fonts.length === 1 || font2 && ( fonts.length === 2 || font3 ) ) && viewRef !== null && (
        <WebView
          ref={webViewRef}
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          androidLayerType="hardware"
          originWhitelist={["*"]}
          mixedContentMode="always"
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          source={{html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, minimum-scale=0.01" />
                <title>Resume</title>
                <style>
                  ${resetCSS()}
                  ${getFontFaces(fonts, [font1, font2, font3])}
        
                  * { font-family: '${fonts[0]}' }
                  body { width: ${templateViewDimensions[size].width}in; height: ${templateViewDimensions[size].width}in; }
                </style>
              </head>
              <body>
                <h1>Resume</h1>
                <p>My resume will go here.</p>
                <p>It will be a PDF eventually.</p>
              </body>
            </html>
          `}}
        />
      )}
      </View>
    </View>
  );
};


const resetCSS = () => (`
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article,aside,canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; vertical-align: baseline; }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {display: block;}
  body {line-height: 1;}
  ol,ul {list-style: none;}
  blockquote,q {quotes: none;}
  blockquote:before,blockquote:after,q:before,q:after {content: '';content: none;}
  table {border-collapse: collapse;border-spacing: 0;}
  html { font-kerning: normal; font-optical-sizing: auto; font-variant-ligatures: none;}
`);

const getFontFaces = (fonts, fontFiles) => {
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