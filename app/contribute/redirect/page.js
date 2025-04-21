import { redirect } from "next/navigation"
import db from "@/lib/db"

export default async function RedirectPage({ searchParams }) {
  // it is difficult to map the topojson to PG data
  // I've added a description to all name duplicate locations
  // which should be enough to find the correct location
  // but will require keeping descriptions unique
  // on locations with duplicate names
  const { name, description, map } = await searchParams
  const location = await db.location.findFirst({
    where: {
      name,
      description: description || "",
      map,
    },
  })
  const [baseMap, variant] = location.map.split("-")
  const creator = variant === "starwall" ? "s" : "j"

  if (location) {
    redirect(`/contribute/${baseMap}/${location.id}`)
  } else {
    redirect(`/contribute/${baseMap}?v=${creator}`)
  }
  return (
    <div className="flex items-center justify-center mt-[40vh]">
      <LoaderCircle className="w-16 h-16 animate-spin" />
    </div>
  )
}
