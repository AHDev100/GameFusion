"use client";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from "./components/navbar";
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; 

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
            <Navbar />
            {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
