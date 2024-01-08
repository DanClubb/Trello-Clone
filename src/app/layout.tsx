import "~/styles/globals.css";

import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";

export const metadata = {
  title: "Drello",
  description: "Trello clone made with create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col font-mono overflow-hidden bg-darkgray text-lightblue`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
