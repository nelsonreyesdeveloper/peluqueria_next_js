import { PeluqueriaProvider } from '@/context/PeluqueriaProvider'
import './globals.css'
import { Inter, Roboto, ADLaM_Display } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'],
variable: '--font-inter',})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata = {
  title: 'Sistema de peluqueria',
  description: 'Sistema de peluqueria, Nueva Guadalupe, San Miguel',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ' ' + roboto.className}>
        <PeluqueriaProvider>
          {children}
        </PeluqueriaProvider>
        <ToastContainer></ToastContainer>
      </body>
    </html>
  )
}
