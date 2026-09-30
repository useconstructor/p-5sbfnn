import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flores del Valle | Diseño Floral de Lujo",
  description: "Arreglos florales personalizados para bodas, eventos corporativos y momentos especiales. Diseño floral de alta gama en Medellín.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
