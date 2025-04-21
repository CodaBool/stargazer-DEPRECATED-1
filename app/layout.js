import Provider from '@/components/provider'
import './globals.css'

export const metadata = {
  title: 'Maps',
  description: 'Community Designed Maps',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
