import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')

  return (
    <div className="flex items-center flex-col mt-[30vh]">
      <p className="max-w-xl my-8 text-center p-2">To contribute, we'll have to authenticate you. This is done through magic links. All you need to provide is your email.</p>
      <Link href="/api/auth/signin">
        <Button>Enter Email</Button >
      </Link >
    </div>
  )
}
