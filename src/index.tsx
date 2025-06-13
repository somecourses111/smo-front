import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import { AuthProvider } from './app/Auth/AuthContext'
import AppRoutes from './app/routing/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import './_metronic/assets/style/mainstyle.css'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
  window.location.href = window.location.href.replace('http:', 'https:');
}


Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
      <MetronicI18nProvider>
        <BrowserRouter  >
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <AppRoutes />
            </LocalizationProvider>
          </AuthProvider>
        </BrowserRouter>
      </MetronicI18nProvider>
  )
}
