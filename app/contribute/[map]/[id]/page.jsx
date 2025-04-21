import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CommentForm from "@/components/forms/comment"
import Avatar from "boring-avatars"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import DOMPurify from "isomorphic-dompurify"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import db from "@/lib/db"
import { ArrowLeft, Star, CircleX } from "lucide-react"
import MiniMap from "@/components/minimap"
import { adminIds } from "@/lib/utils"

export default async function Location({ params, searchParams }) {
  // const
  const session = await getServerSession(authOptions)
  const { id, map } = await params
  const { c: commentFormOpen } = await searchParams
  const user = session ? await db.user.findUnique({ where: { email: session.user.email } }) : null
  const location = await db.location.findUnique({
    where: {
      id: Number(id),
      // map: mapFilter,
    },
    include: {
      comments: {
        where: {
          OR: [
            { published: true },
            { userId: user ? user.id : "" },
          ]
        }
      }
    }
  })

  // seems like an expensive operation
  const commenterIds = location.comments.map(c => c.userId)
  const commenters = await db.user.findMany({
    where: {
      id: {
        in: commenterIds
      }
    },
    select: {
      id: true,
      alias: true,
      email: true,
    }
  })

  let viewable = location.published
  if (!viewable && location.userId === user.id) {
    viewable = true
  }

  const creator = location.map.split('-')[1]
  // run this on every anchor tag
  DOMPurify.addHook('afterSanitizeElements', node => {
    if (node.tagName === 'A') {
      // check if relative, trusted, or already altered link
      if (!node.href.startsWith("/") && !node.href.startsWith('https://stargazer.vercel.app/')) {
        // give a prompt that the link is external
        const href = new URLSearchParams({ url: node.href }).toString()
        node.setAttribute('href', `/link?${href}`)
      }
    }
  })

  // probably not necessary but just to be safe
  DOMPurify.setConfig({
    FORBID_TAGS: ['img', 'svg', 'math', 'script', 'table', 'iframe'],
  })

  // sanitize location HTML
  location.description = DOMPurify.sanitize(location.description)

  // sanitize comment HTML
  location.comments.forEach(comment => {
    const commenter = commenters.find(user => user.id === comment.userId)
    comment.alias = commenter.alias ? commenter.alias : commenter.email.split('@')[0]
    comment.content = DOMPurify.sanitize(comment.content)
  })

  let panX = "wow such NaN"
  let panY = "wow such NaN"
  if (location.coordinates.includes(",")) {
    panX = Number(location.coordinates.split(",")[0].trim())
    panY = Number(location.coordinates.split(",")[1].trim())
  }

  return (
    <div className="mx-auto my-4 md:container mr-1">
      <Link href={`/contribute/${map}?v=${creator.charAt(0)}`} className="w-[50px] block">
        <div className="w-[50px] h-[50px] rounded-2xl border border-[#1E293B] mb-2 ml-6 md:ml-0" style={{ background: "#070a0d" }}>
          <ArrowLeft size={42} className="relative left-[3px] top-[3px]" />
        </div>
      </Link>
      <Card className="">
        <CardHeader>
          <CardTitle>
            {location.name}
            {!location.published && <Badge variant="secondary" className="mx-1">Pending Review</Badge>}
            {location.thirdParty && <Badge variant="destructive" className="mx-1">Unofficial</Badge>}
            {location.destroyed && <Badge variant="secondary" className="mx-1">Destroyed</Badge>}
            {location.capital && <Badge variant="secondary" className="mx-1">Capital</Badge>}
          </CardTitle>
          <div className="text-gray-400">{location.type}</div>
          <span className="">Coordinates: <span className="text-gray-400">{Math.floor(Number(panX))} {Math.floor(panY)}</span></span>
          {location.faction && <span className="inline">Faction: <span className="text-gray-400 inline">{location.faction}</span></span>}
          {location.city && <span className="inline">City: <span className="text-gray-400 inline">{location.city}</span></span>}
          {location.alias && <span className="inline">Alias: <span className="text-gray-400 inline">{location.alias}</span></span>}
          <span className="">Source: <span className="text-gray-400">{location.source}</span></span>
        </CardHeader>
        <CardContent className="location-description border border-gray-800 rounded-2xl pt-4 md:mx-6 bg-[#02050D]" dangerouslySetInnerHTML={{ __html: location.description }} />

        <Accordion type="single" collapsible className="md:mx-8 mx-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>See on map</AccordionTrigger>
            <AccordionContent className="map-container flex justify-around">
              {isNaN(panX)
                ? <div>
                  <CircleX className="mx-auto" /> Invalid Coordinates
                </div>
                : <MiniMap panX={panX} panY={panY} creator={creator} />
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <CardFooter className="flex-col items-start mt-4 md:p-6 p-1">
          {commentFormOpen
            ? <CommentForm map={map} locationId={id} />
            : <Link href={`/contribute/${map}/${id}/?c=1`} className="md:w-[150px] w-full"><Button variant="outline" className="md:w-[150px] w-full">Create Comment</Button></Link>
          }
          <div className="w-full my-4">
            {location.comments.map(comment => {
              return (
                <div className="border border-gray-800 p-2 rounded mb-1" key={comment.id}>
                  <div className="flex items-center mb-1">
                    <Avatar
                      size={25}
                      name={comment.alias}
                      variant="beam"
                      colors={[
                        '#DBD9B7',
                        '#C1C9C8',
                        '#A5B5AB',
                        '#949A8E',
                        '#615566',
                      ]}
                    />
                    <h2 className="font-bold text-lg mx-2">{comment.alias}</h2>
                    {!comment.published && <Badge variant="secondary">Pending Review</Badge>}
                    {adminIds.includes(comment.userId) && <Badge variant="secondary" className="mx-2"><Star size={12} /></Badge>}
                  </div>
                  <div className="location-description border border-gray-800 rounded-2xl p-3 md:mx-6 bg-[#02050D]" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                </div>
              )
            })}
          </div>
        </CardFooter >
      </Card>
    </div>
  )
}
