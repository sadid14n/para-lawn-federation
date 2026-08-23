import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from 'next/headers';
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
  title: "Para Indian Lawn Bowls Federation",
  description: "National Governing Body for Para Lawn Bowls in India",
};

export default  async function RootLayout({ children }) {

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  const session = sessionCookie ? JSON.parse(sessionCookie.value) : null;


  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased flex flex-col min-h-screen`}>
          {/* Render the unified Header (Top + Main Nav) */}
        <Header session={session}/>
        
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