import Menubar from '@/components/menu'

export default async function Menu({ params, children }) {
  const { map } = await params
  return (
    <>
      <Menubar path={`/${map}`} map={map} />
      {children}
    </>
  )
}
