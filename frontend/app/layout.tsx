import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attack Capital task",
  description: "This is my task submission for Attack Capital Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader />
        <ToastContainer />
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
