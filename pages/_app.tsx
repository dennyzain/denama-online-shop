import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../components/redux/store';
import '../styles/globals.css';
import '../styles/base.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
