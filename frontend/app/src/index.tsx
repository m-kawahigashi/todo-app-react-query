import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import store from 'redux/store/store';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const container = document.getElementById('root');
const queryClient = new QueryClient();

// if ( container ) {
//   const root = createRoot(container);
//   root.render(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );
// }

if ( container ) {
  const root = createRoot(container);
  root.render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    );
}