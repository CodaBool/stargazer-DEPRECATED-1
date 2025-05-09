import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/lib/db"

async function sendVerificationRequest({ identifier: email, url }) {
  const urlParams = new URLSearchParams({
    subject: "Sign into Community Maps",
    to: email,
    name: "contributor",
    from: "Community Maps",
    secret: process.env.EMAIL_SECRET,
    simpleBody: `<h1>Welcome to Stargazer</h1><a href="${url}">Please click here to login</a><p>This link is only valid for 24 hours</p>`
  }).toString()
  // just keep email contents in a param for now
  const res = await fetch(`https://email.codabool.workers.dev/?${urlParams}`, {
    method: "POST",
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(err)
    throw new Error(err)
  }
}

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 31556952, // in seconds (31,556,952 = 1 year)
  },
  providers: [{
    id: "http-email",
    name: "Email",
    type: "email",
    maxAge: 60 * 60 * 24, // Email link will expire in 24 hours
    sendVerificationRequest,
  }],
  theme: {
    colorScheme: "dark",
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
