import "~/styles/globals.css";

import { cookies } from "next/headers";

import type { Viewport } from 'next';
import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata = {
  title: "Drello",
  description: "Trello clone made with create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body className={`flex flex-col overflow-hidden bg-darkgray text-lightblue`}>
        <TRPCReactProvider cookies={cookies().toString()}>
            <Header session={session ? true : false} />
            {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
