import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import serializeJavascript from 'serialize-javascript';
import createEmotionCache from '../src/createEmotionCache';
import config, { RuntimeConfig } from '../src/config';
import { RUNTIME_CONFIG_WINDOW_PROPERTY } from '../src/constants';

interface ToolpadDocumentProps {
  config: RuntimeConfig;
}

export default class MyDocument extends Document<ToolpadDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & ToolpadDocumentProps> {
    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) =>
          function EnhancedApp(props) {
            return <App emotionCache={cache} {...props} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
      config,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                // Add the data-toolpad-canvas attribute to the canvas iframe element
                if (window.frameElement?.dataset.toolpadCanvas){
                  var script = document.createElement('script');
                  script.src = '/reactDevtools/bootstrap.global.js';
                  document.write(script.outerHTML);
                }
              `,
            }}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `window[${JSON.stringify(
                RUNTIME_CONFIG_WINDOW_PROPERTY,
              )}] = ${serializeJavascript(this.props.config, { ignoreFunction: true })}`,
            }}
          />
        </Head>
        {/* https://github.com/facebook/react/issues/11538 */}
        <body className="notranslate">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
