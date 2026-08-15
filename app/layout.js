import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";

// Initialize the font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  // This variable makes it easy to use with Tailwind if needed
  variable: '--font-jakarta', 
});

export const metadata = {
  title: "Grappling Federation of India",
  description: "National Governing Body for Grappling Sports in India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased flex flex-col min-h-screen`}>
          {/* Render the unified Header (Top + Main Nav) */}
        <Header />
        
        {/* main flex-grow pushes footer down if content is small */}
        <main className="flex-grow w-full">
          {children}
        </main>
        
        {/* Render the Footer */}
        <Footer />
      </body>
    </html>
  );
}