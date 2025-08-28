import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import StoreStateContextProvider from "./lib/context/storeContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Gam3r Network",
  description: "The Gam3r Network website is your place for unfiltered discussions in forums and livestreams, as well as exclusive videos and Games custom tailored for your entertainment. Jump down the rabbit hole and join the network!",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreStateContextProvider>
      <Provider>
      <body className={inter.className}>{children}</body>
      </Provider>
      </StoreStateContextProvider>
    </html>
  );
}
