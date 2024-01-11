"use client"

import { signIn, signOut } from "next-auth/react";

interface SignInOutButtonProps {
  session: boolean
}

export default function SignInOutButton({session}: SignInOutButtonProps) {
  if (session) return <button className="ml-auto" onClick={() => signOut()}>Sign out</button>
  
  return <button className="ml-auto" onClick={() => signIn()}>Sign in</button>
}