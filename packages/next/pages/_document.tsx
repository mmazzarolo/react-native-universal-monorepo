import { Children } from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { AppRegistry } from 'react-native';
import config from '../app.json';

// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: DocumentContext) {
    AppRegistry.registerComponent(config.name, () => Main)
    const page = await renderPage()
    const styles = [
      <style key='style' dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
    ]
    return { ...page, styles: Children.toArray(styles) }
  }

  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head />
        <body style={{ height: '100%', overflow: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}