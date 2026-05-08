import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "./globals.css";

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
    <html lang="es" className={`${manrope.variable} ${poppins.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

