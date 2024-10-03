import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laboratory Management Dashboard",
  description: "Manage your laboratory assets in one place",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class">
        <body
          className={`${inter.className} dark:bg-dark-bg dark:text-dark-text`}
        >
          {children}
          <ToastContainer />
        </body>
      </ThemeProvider>
    </html>
  );
}
