"use client"

import { signIn, signOut } from "next-auth/react";

interface SignInOutButtonProps {
  session: boolean
}

export default function SignInOutButton({session}: SignInOutButtonProps) {
  if (session) return <button className="ml-auto py-1 px-2 rounded border border-current text-nowrap transition hover:text-skyblue" onClick={() => signOut()}>Sign out</button>
  
  return <button className="ml-auto text-nowrap rounded border border-current transition hover:text-skyblue" onClick={() => signIn()}>Sign in</button>
}