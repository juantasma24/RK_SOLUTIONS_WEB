import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "La Manzana - RK Solutions",
  description: "RK Solutions — La Manzana: facturación, fichajes y cumplimiento normativo en una sola plataforma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${poppins.variable} no-animate`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html:
          `try{if(!(+sessionStorage.getItem('rkSY')>60))document.documentElement.classList.add('is-at-top');}catch(e){}`
        }} />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
