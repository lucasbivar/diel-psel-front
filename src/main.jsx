import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import { theme } from './styles/theme';
import ScrollToTop from './utils/scrollToTop';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>

  </React.StrictMode>,
);
