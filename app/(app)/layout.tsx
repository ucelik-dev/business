import React from "react";
import NavBar from "./(public)/components/Navbar";



export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>

      <NavBar />
        <main className='px-5 py-20 h-[500px] mt-4 md:mt-12'>
          {children}
        </main>

      </body>
    </html>
  );
}
