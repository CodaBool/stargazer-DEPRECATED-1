
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js"
import db from "@/lib/db"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CreateLocation from "@/components/forms/location"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"

export default async function Contribute({ params, searchParams }) {
  const session = await getServerSession(authOptions)
  const { p: openLocationForm, v: variant } = await searchParams
  const { map } = await params

  const creator = variant === "s" ? "starwall" : "janederscore"
  const mapFilter = map + "-" + creator

  // TODO: test if this will be a cached request for unauth requests
  const user = session ? await db.user.findUnique({ where: { email: session.user.email } }) : null
  const locations = await db.location.findMany({
    where: {
      OR: [
        { published: true },
        { userId: user ? user.id : "" }
      ],
      map: mapFilter,
    },
  })

  return (
    <div className="md:container mx-auto my-10 mr-1">
      {openLocationForm
        ? <CreateLocation map={map} />
        : <Link href={`/contribute/${map}?p=1`} ><Button variant="outline" className="w-full my-4">Create a new Location</Button ></Link>
      }
      <Dialog>
        <DialogTrigger className="rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:text-slate-50 h-10 w-full my-4">What is this?</DialogTrigger>
        <DialogContent className="sm:px-6 px-0  pr-2">
          <DialogHeader>
            <DialogTitle>This is not a wiki</DialogTitle>
            <DialogDescription>
              &emsp;Here you can find a list of the current locations for the map. As well as any community submitted locations.
              <br /><br />
              &emsp;The purpose of this is to keep the coordinates and simple location data as accurate as possible.
              <br /><br />
              &emsp;If you have spotted an inaccuracy and can find supporting evidence, your contribution is very welcome.
              <br /><br />
              &emsp;That said, the application is intentionally scoped as a map and should not be used as a repository of lore. There are only a few of pieces of information that are needed:
              <br /><br />
              <span className="text-gray-200">- name and aliases</span>
              <br />
              <span className="text-gray-200">- type of location (i.e. moon, gate)</span>
              <br />
              <span className="text-gray-200">- its location</span>
              <br /><br />
              the focus of this application will always be the map

              <svg xmlns="http://www.w3.org/2000/svg" className="sm:pl-10">
                <g transform="translate(0, -40) scale(0.4)">
                  <path id="svg_1" d="m100.5,126.80573l11.84103,0l3.65897,-11.84098l3.65897,11.84098l11.84103,0l-9.57958,7.31804l3.65916,11.84098l-9.57958,-7.31824l-9.57958,7.31824l3.65916,-11.84098l-9.57958,-7.31804z" stroke="black" fill="#fff" />
                  <path id="svg_2" d="m222.5,265.80573l11.84103,0l3.65897,-11.84098l3.65897,11.84098l11.84103,0l-9.57957,7.31804l3.65915,11.84098l-9.57958,-7.31824l-9.57958,7.31824l3.65916,-11.84098l-9.57958,-7.31804z" stroke="black" fill="#fff" />
                  <path id="svg_3" d="m361.5,245.80573l11.84103,0l3.65897,-11.84098l3.65897,11.84098l11.84103,0l-9.57957,7.31804l3.65915,11.84098l-9.57958,-7.31824l-9.57958,7.31824l3.65916,-11.84098l-9.57958,-7.31804z" stroke="black" fill="#fff" />
                  <path id="svg_4" d="m476.5,409.80573l11.84103,0l3.65897,-11.84098l3.65897,11.84098l11.84103,0l-9.57957,7.31804l3.65915,11.84098l-9.57958,-7.31824l-9.57958,7.31824l3.65916,-11.84098l-9.57958,-7.31804z" stroke="black" fill="#fff" />
                  <path id="svg_5" d="m601.5,279.80573l11.84103,0l3.65897,-11.84098l3.65897,11.84098l11.84103,0l-9.57957,7.31804l3.65915,11.84098l-9.57958,-7.31824l-9.57958,7.31824l3.65916,-11.84098l-9.57958,-7.31804z" stroke="black" fill="#fff" />
                  <line id="svg_6" y2="270.5" x2="237" y1="129.5" x1="115" stroke="mediumpurple" fill="none" />
                  <line id="svg_7" y2="417.5" x2="491" y1="283.5" x1="617" stroke="mediumpurple" fill="none" />
                  <line id="svg_8" y2="249.5" x2="376" y1="270.5" x1="238" stroke="mediumpurple" fill="none" />
                  <line id="svg_9" y2="250.5" x2="377" y1="415.5" x1="492" stroke="mediumpurple" fill="none" />
                </g>
              </svg>
              <span className="flex items-center justify-center">
                <span className="text-gray-500 text-sm">&emsp;"...along ancient charted paths and out toward new worlds. Union could not bring their dead back home. But they would choke the stars with the living"</span>
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {(!locations || locations?.length === 0) &&
        <h1 className="text-2xl text-blue-100 text-center my-36">Could not fetch Location discussions at this time</h1>
      }

      <div className="flex flex-wrap justify-center">
        {locations?.map(location => {
          return (
            <Card className="w-full  m-2 min-[392px]:w-[180px]" key={location.id}>
              <Link href={`/contribute/${map}/${location.id}`} className="block h-full">
                <CardContent className="p-2 m-0">
                  <p className="font-bold text-xl text-center overflow-hidden overflow-ellipsis">{location.name}</p>
                  <p className="text-center text-gray-500">{location.type}</p>
                  <div className="flex justify-center flex-col">
                    {location.thirParty && <Badge variant="destructive" className="mx-auto mb-2">Unofficial</Badge>}
                    {!location.published && <Badge variant="secondary" className={`mx-auto`}>Pending Review</Badge>}
                    {!location.resolved && <Badge variant="secondary" className={`mx-auto`}>Help Wanted</Badge>}
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
