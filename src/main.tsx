import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import '@mantine/core/styles.css';

// const theme = createTheme({
//   fontFamily: 'Open Sans, sans-serif',
//   primaryColor: 'cyan',
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)

