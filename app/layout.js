import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { cookies } from "next/headers";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import "./globals.css";

// Body/UI font — unchanged
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

// Display font — now Inter, still exposed as the same --font-display
// variable so every component using var(--font-display) picks it up
// automatically with zero other changes needed.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

export const metadata = {
  title: "Para Indian Lawn Bowls Federation",
  description: "National Governing Body for Para Lawn Bowls in India",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  const session = sessionCookie ? JSON.parse(sessionCookie.value) : null;

  return (
    <html lang="en">
      <body
        className={`${jakarta.className} ${jakarta.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <SmoothScrollProvider>
          <Header session={session} />
          <main className="flex-grow w-full">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}