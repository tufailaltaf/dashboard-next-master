import '@/app/ui/global.css';
import { inter } from '@/app/ui/font';
import { Suspense } from 'react';
import { ClerkProvider } from '@clerk/nextjs'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        </body>
    </html>
        </ClerkProvider>
  );
}