import Menubar from '@/components/menu'
import { Toaster } from "@/components/ui/sonner"

export default function Menu({ children }) {
  return (
    <>
      <Menubar path={`/profile`} />
      <Toaster />
      {children}
    </>
  )
}
