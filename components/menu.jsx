'use client'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Github, UserRound, Copyright, Sparkles, Telescope, SquareArrowOutUpRight, MoonStar, Sparkle, BookOpen, Bug, Pencil, Plus, MapPin, RectangleHorizontal, Map, ArrowRightFromLine, Hexagon, ListCollapse, User, LogOut, Ruler, CodeXml } from "lucide-react"
import SearchDialog from './dialog'
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import topo from "@/app/data.js"
import { useEffect } from "react"

let newParams = ""

function handleDownload(collection) {
  const urlParams = new URLSearchParams(window.location.search)

  // TODO: allow for a third map variant based on community input
  const creator = urlParams.get("variant") === "starwall" ? "starwall" : "janederscore"
  // collection can be one of Guides, Geography, Points
  const data = topo[creator + collection]

  // OH BOY I SURE DO LOVE THAT THIS IS THE SOLUTION IN JAVASCRIPT LAND!!!!! 🫠
  // if it ends up being the case to have the source of truth data file in the /public
  // then I really should instead use Nextjs <Link href="/*.topojson" download>
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a')
  a.href = url
  a.download = `${creator}_${collection.toLowerCase()}.topojson`
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Menu({ path, map }) {
  const { data: session } = useSession()

  useEffect(() => {
    // this approach could be improved but seems to work for now
    const urlParams = new URLSearchParams(window.location.search)
    // starwall or janederscore
    const v = urlParams.get("variant") === "starwall" ? "s" : "j"
    newParams = new URLSearchParams({ v }).toString()
  }, [])

  if (map) {
    return (
      <Menubar>

        <MenubarMenu>

          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer"><Map size={16} className="mr-1" /> Maps</MenubarSubTrigger >
              <MenubarSubContent>
                <MenubarSub>
                  <MenubarSubTrigger className="cursor-pointer"><Hexagon size={16} className="inline mr-1" /> Lancer</MenubarSubTrigger>
                  <MenubarSubContent>
                    <a href="/lancer">
                      <MenubarItem className="cursor-pointer">
                        <UserRound size={16} className="inline mr-1" /> Janederscore
                      </MenubarItem>
                    </a>

                    <a href="/lancer?variant=starwall">
                      <MenubarItem className="cursor-pointer">
                        <UserRound size={16} className="inline mr-1" /> Starwall
                      </MenubarItem>
                    </a>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer"><ArrowRightFromLine size={16} className="mr-1" /> Export</MenubarSubTrigger >
              <MenubarSubContent>
                {/* See handleDownload's comment on why public folder is not used */}
                {/* <Link href="/points.topojson" target="_blank" download> */}
                <MenubarItem className="cursor-pointer" onClick={() => handleDownload('Points')}>
                  <MapPin size={16} className="inline mr-1" /> Points Topojson
                </MenubarItem >
                {/* </Link> */}
                <MenubarItem className="cursor-pointer" onClick={() => handleDownload('Geography')}>
                  <RectangleHorizontal size={16} className="inline mr-1" /> Geography Topojson
                </MenubarItem >
                <MenubarItem className="cursor-pointer" onClick={() => handleDownload('Guides')}>
                  <Ruler size={16} className="inline mr-1" /> Guides Topojson
                </MenubarItem >
                <MenubarItem className="cursor-pointer text-gray-500">
                  <CodeXml size={16} className="inline mr-1" /> Create Embed
                </MenubarItem >
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer"><Heart size={16} className="mr-1" />Contribute</MenubarSubTrigger >
              <MenubarSubContent>
                <Link href={`/contribute/${map}?${newParams}`}>
                  <MenubarItem className="cursor-pointer">
                    <Pencil size={16} className="inline mr-1" /> Edit an existing Location
                  </MenubarItem>
                </Link>
                <Link href={session ? `/contribute/${map}?post=true` : "/contribute"}>
                  <MenubarItem className="cursor-pointer">
                    <Plus size={16} className="inline mr-1" /> Add a new Location
                  </MenubarItem >
                </Link>
                <a href="https://github.com/codabool/community-vtt-maps/issues" target="_blank">
                  <MenubarItem className="cursor-pointer">
                    <Bug size={16} className="inline mr-1" /> Something Else
                  </MenubarItem >
                </a>
              </MenubarSubContent>
            </MenubarSub>

            <AboutMenu />

          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <SearchDialog />
        </MenubarMenu>

      </Menubar>
    )
  } else {
    return (
      <Menubar>

        <MenubarMenu>
          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer"><Map size={16} className="mr-1" /> Maps</MenubarSubTrigger >
              <MenubarSubContent>
                <MenubarSub>
                  <MenubarSubTrigger className="cursor-pointer"><Hexagon size={16} className="inline mr-1" /> Lancer</MenubarSubTrigger>
                  <MenubarSubContent>
                    <a href="/lancer">
                      <MenubarItem className="cursor-pointer">
                        <UserRound size={16} className="inline mr-1" /> Janederscore
                      </MenubarItem>
                    </a>

                    <a href="/lancer?variant=starwall">
                      <MenubarItem className="cursor-pointer">
                        <UserRound size={16} className="inline mr-1" /> Starwall
                      </MenubarItem>
                    </a>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarSubContent>
            </MenubarSub>

            {/* {(path === "/profile" || path === "/contribute") &&
              <MenubarSub>
                <MenubarSubTrigger className="cursor-pointer"><Heart size={16} className="mr-1" />Contribute</MenubarSubTrigger >
                <MenubarSubContent>
                  <Link href={`/contribute/lancer`}>
                    <MenubarItem className="cursor-pointer">
                      <Hexagon size={16} className="inline mr-1" /> Lancer
                    </MenubarItem>
                  </Link>
                </MenubarSubContent >
              </MenubarSub>
            } */}

            <a href="https://github.com/codabool/community-vtt-maps/issues" target="_blank">
              <MenubarItem inset className="cursor-pointer  pl-2"><Bug size={16} className="inline mr-1" /> Issues</MenubarItem>
            </a>

            <AboutMenu />

          </MenubarContent>

        </MenubarMenu>

        {session &&
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">Account</MenubarTrigger  >
            <MenubarContent>
              <MenubarSeparator />
              <Link href="/profile">
                <MenubarItem className="cursor-pointer pl-[.98em]">
                  <User size={18} className="inline mr-1" /> Profile
                </MenubarItem >
              </Link>
              <MenubarItem onClick={signOut} className="ps-4 cursor-pointer">
                <LogOut size={16} className="inline mr-1" /> Sign out
              </MenubarItem >
            </MenubarContent>
          </MenubarMenu>
        }
      </Menubar>
    )
  }
}

function AboutMenu() {
  return (
    <MenubarSub>
      <MenubarSubTrigger className="cursor-pointer"><ListCollapse size={16} className="mr-1" />About</MenubarSubTrigger >
      <MenubarSubContent>
        <a href="https://github.com/codabool/community-vtt-maps/blob/main/license" target="_blank">
          <MenubarItem inset className="cursor-pointer"><Copyright size={16} className="inline mr-1" /> License</MenubarItem>
        </a>

        <a href="https://github.com/codabool/community-vtt-maps" target="_blank">
          <MenubarItem inset className="cursor-pointer"><Github size={16} className="inline mr-1" /> Source Code</MenubarItem>
        </a>

        <a href="https://github.com/codabool/community-vtt-maps/wiki" target="_blank">
          <MenubarItem inset className="cursor-pointer  text-gray-500"><BookOpen size={16} className="inline mr-1" /> Wiki</MenubarItem>
        </a>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full pl-0">
              <Heart size={16} className="relative top-[-1px] pe-[2px] inline" /> Credits
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]" style={{ color: 'white' }}>
            <DialogHeader>
              <DialogTitle><><Heart size={18} className="pe-[2px] animate-bounce inline mr-2" /> Credits</></DialogTitle>
              <DialogDescription className="py-6">
                <Credits />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </MenubarSubContent>
    </MenubarSub>
  )
}

function Credits() {
  return (
    <>
      <span className="text-xl"><Telescope className="inline pr-2 ml-[13em]" size={32} /> Major</span>
      <span className="flex mb-[10em]">
        <span className="flex-1">
          <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-40, -90) scale(0.4)">
              <path id="svg_3" d="m110.45,277.97498l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54921,0l-7.72546,5.42952l2.95093,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95093,-8.78524l-7.72547,-5.42952z" stroke="black" fill="#fff" />
              <path id="svg_5" d="m218.45,252.97498l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="black" fill="white" />
              <path id="svg_6" d="m270.45001,295.97498l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="black" fill="#fff" />
              <path id="svg_7" d="m379.45,425.97501l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="black" fill="#fff" />
              <path id="svg_8" d="m529.45003,436.97504l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="black" fill="#fff" />
              <path id="svg_9" d="m547.45006,338.97501l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="black" fill="#fff" />
              <path id="svg_10" d="m362.45003,345.97501l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="black" fill="#fff" />
              <line id="svg_11" y2="257.00005" x2="232.0001" y1="282.00006" x1="123.00008" stroke="mediumpurple" fill="none" />
              <line id="svg_12" y2="441.00008" x2="542.00014" y1="342.00007" x1="560.00015" stroke="mediumpurple" fill="none" />
              <line id="svg_13" y2="442.00008" x2="543.00014" y1="428.00008" x1="391.00012" stroke="mediumpurple" fill="none" />
              <line id="svg_14" y2="342.00007" x2="560.00015" y1="349.00007" x1="376.00012" stroke="mediumpurple" fill="none" />
              <line id="svg_15" y2="300.00006" x2="285.0001" y1="256.00005" x1="230.0001" stroke="mediumpurple" fill="none" />
              <line id="svg_16" y2="346.00007" x2="375.00012" y1="427.00008" x1="391.00012" stroke="mediumpurple" fill="none" />
              <line id="svg_17" y2="349.00007" x2="374.00012" y1="298.00006" x1="284.0001" stroke="mediumpurple" fill="none" />
            </g>
          </svg>
        </span>
        <span className="flex-1 text-left">
          <span><Sparkles className="inline pr-2" /><a href="https://janederscore.tumblr.com" target="_blank"> Janederscore <SquareArrowOutUpRight className="inline" size={14} /></a></span><br />
          <span><Sparkles className="inline pr-2" /> Starwall</span><br />
        </span>
      </span>
      <span className="text-xl"><MoonStar className="inline pr-2 ml-[13em]" size={32} /> Minor</span>
      <span className="flex">
        <span className="flex-1">
          <svg width="240" height="100" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-40, -10) scale(0.4)">
              <path id="svg_3" d="m179.45002,183.97498l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54921,0l-7.72546,5.42952l2.95093,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95093,-8.78524l-7.72547,-5.42952z" stroke="#000" fill="#fff" />
              <path id="svg_5" d="m226.45,220.97498l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="#000" fill="#fff" />
              <path id="svg_6" d="m239.45,116.97495l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="#000" fill="#fff" />
              <path id="svg_7" d="m476.45001,128.97495l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="#000" fill="#fff" />
              <path id="svg_8" d="m551.45003,151.97501l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="#000" fill="#fff" />
              <path id="svg_9" d="m383.45004,120.97498l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="#000" fill="#fff" />
              <path id="svg_10" d="m274.45002,165.97498l9.54922,0l2.95078,-8.78524l2.95078,8.78524l9.54922,0l-7.72547,5.42952l2.95094,8.78524l-7.72547,-5.42966l-7.72547,5.42966l2.95094,-8.78524l-7.72547,-5.42952z" stroke="#000" fill="#fff" />
              <line id="svg_18" y2="226.00005" x2="240.0001" y1="186.00004" x1="191.00009" stroke="mediumpurple" fill="none" />
              <line id="svg_19" y2="132.00004" x2="487.00014" y1="156.00004" x1="564.00015" stroke="mediumpurple" fill="none" />
              <line id="svg_20" y2="170.00004" x2="287.0001" y1="124.00003" x1="395.00012" stroke="mediumpurple" fill="none" />
              <line id="svg_21" y2="120.00003" x2="252.0001" y1="185.00004" x1="191.00009" stroke="mediumpurple" fill="none" />
              <line id="svg_22" y2="124.00003" x2="394.00012" y1="131.00004" x1="488.00014" stroke="mediumpurple" fill="none" />
              <line id="svg_23" y2="170.00004" x2="289.00011" y1="224.00005" x1="239.0001" stroke="mediumpurple" fill="none" />
              <line id="svg_24" y2="171.00004" x2="289.00011" y1="121.00003" x1="252.0001" stroke="mediumpurple" fill="none" />
            </g >
          </svg>
        </span>
        <span className="flex-1">
          {/* <span><Sparkle className="inline pr-2" /><a href="" target="_blank"> placeholder <SquareArrowOutUpRight className="inline" size={14} /></a></span><br /> */}
          {/* <span><Sparkle className="inline pr-2" /> contribute to be added</span><br /> */}
        </span>
      </span>
      <span className="text-center block text-[dimgray] mt-4">Created with <Heart size={14} className="inline" /> by <Link href="/easteregg" style={{ color: "#60677c" }}>CodaBool</Link></span>
      <span className="text-center block text-[dimgray] mt-4">Stargazer is not an official Lancer product<br />Lancer is copyright Massif Press</span>
    </>
  )
}
