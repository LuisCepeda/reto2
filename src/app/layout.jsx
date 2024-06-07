import { Inter  as FontSans} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/ui/navbar";

const fontSans=FontSans({
  subsets: ['latin'],
  variable:"--font-sans"
})

export const metadata = {
  title: "Reto 2",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <main className="container mx-auto">
          <Navbar />
            {children}

          </main>
          </ThemeProvider>
      </body>
    </html>
  );
}
