import { useRef, useState, useCallback } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";

import { getFont, getFontFaces } from "./fontHooks";
import { templateVariants } from "./variants";

import templateDecorations from "./decorations";

export const TemplateView = ({ variant, fonts, fontSize, margin, style, pages, setPages, setHtml, print, setPrint }) => {
  const [font1] = getFont(fonts[0]);
  const [font2] = fonts.length > 1 ? getFont(fonts[1]) : [null];
  const [font3] = fonts.length > 2 ? getFont(fonts[2]) : [null];

  const profile = useSelector((state) => state.profiles[state.currentProfile]);
  const options = useSelector((state) => state.profiles[state.currentProfile].options);

  const [categoryOrder, setCategoryOrder] = useState(Object.entries(profile).filter(([key, value]) => value.active).map(([key, value]) => key));
  const [webViewDimensions, setWebViewDimensions] = useState({ width: 0, height: 0 });

  const viewRef = useRef(null);

  const templateViewDimensions = {
    letter: { width: 8.5, height: 11 },
    A4: { width: 8.27, height: 11.69 },
  };

  const onLayout = useCallback(event => {
    viewRef.current.measure((x, y, width, height, pageX, pageY) => {
      const aspectRatio = templateViewDimensions[options.size].width / templateViewDimensions[options.size].height;
      const newWidth = Math.min(width, height * aspectRatio);
      const newHeight = newWidth / aspectRatio;
      setWebViewDimensions({ width: newWidth, height: newHeight });
    }
  )}, [options.size]);

  // templateData = { html, css, columns }
  const { html, css, columns, extraPageHtml } = templateVariants[variant](profile, fonts, fontSize, margin, templateViewDimensions[options.size], categoryOrder, setCategoryOrder, pages, setPages);

  const compactMode = {
    summary: false,
    objective: false,
    highlights: false,
    experience: false,
    volunteer: false,
    education: false,
    certificates: false,
    projects: false,
    publications: false,
    skills: false,
    languages: false,
    references: false,
  };

  const buildTemplateHtml = () => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, minimum-scale=0.01" />
        <title>Resume</title>
        <style>
          ${getFontFaces(fonts, [font1, font2, font3])}
          html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article,aside,canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {display: block;} body {line-height: 1;} ol,ul {list-style: none;} blockquote,q {quotes: none;} blockquote:before,blockquote:after,q:before,q:after {content: ''; content: none;} table {border-collapse: collapse; border-spacing: 0;} html { font-kerning: normal; font-optical-sizing: auto; font-variant-ligatures: none;}
          * { line-height: 125% }
          @page {
            margin: 0;
          }
          html { font-family: '${fonts[0]}'; font-size: ${fontSize}px; }
          body { width: ${templateViewDimensions[options.size].width}in; height: ${templateViewDimensions[options.size].height * pages}in; }
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>

      <script>
        window.onload = function() {
          const handlePages = () => {
            const sections = document.querySelectorAll("section");
            const compactMode = ${JSON.stringify(compactMode)};
            const extraPageHtml = ${JSON.stringify(extraPageHtml)};
            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

            const sectionArray = [];

            sections.forEach(section => {
              sectionArray.push({ element: section, height: section.getBoundingClientRect().height });
              section.remove();
            });

            let currentPage = document.querySelectorAll("article")[0];
            let pagePaddingY = parseFloat(getComputedStyle(currentPage).paddingTop) + parseFloat(getComputedStyle(currentPage).paddingBottom);
            let pageUsableHeight = currentPage.getBoundingClientRect().height - pagePaddingY;
            let page = 1
            let column = 1;
            let columnContentHeight = 0;

            sectionArray.forEach(section => {
              if (pageUsableHeight >= section.height + rem + columnContentHeight) {
                currentPage.appendChild(section.element);
                columnContentHeight += section.height + rem;
              } else if (${columns} > column) {
                column++;
                columnContentHeight = section.height;
                currentPage.appendChild(section.element);
              } else {
                document.body.innerHTML += extraPageHtml;
                const aside = document.querySelectorAll("aside")[page];
                aside.style.position = "absolute";
                aside.style.top = \`calc(${templateViewDimensions[options.size].height}in * \$\{page\})\`;
                aside.style.left = "0";
                aside.style.width = "${templateViewDimensions[options.size].width}in";
                aside.style.height = "${templateViewDimensions[options.size].height}in";
                aside.style.zIndex = "-1";
                aside.style.pointerEvents = "none";

                page++;
                column = 1;
                columnContentHeight = section.height;
                currentPage = document.querySelectorAll("article")[page - 1];
                pagePaddingY = parseFloat(getComputedStyle(currentPage).paddingTop) + parseFloat(getComputedStyle(currentPage).paddingBottom);
                pageUsableHeight = currentPage.getBoundingClientRect().height - pagePaddingY;
                currentPage.appendChild(section.element);
              }
            });
          };
          
          handlePages();
        }
      </script>

    </html>
  `;

  if (print) {
    setHtml(buildTemplateHtml());
    setPrint(false);
  }

  return (
    <View
      onLayout={onLayout}
      ref={viewRef}
      style={style}
    >
      <View
        style={webViewDimensions}
      >
      { font1 !== null && ( fonts.length === 1 || font2 && ( fonts.length === 2 || font3 ) ) && viewRef !== null && (
        <WebView
          style={webViewDimensions}
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
          source={{html: buildTemplateHtml()}}
        />
      )}
      </View>
    </View>
  );
};