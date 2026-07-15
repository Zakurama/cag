import React from 'react';
// @ts-ignore
import './styles.css';
import Header from '@/components/Header';
import { cookies } from 'next/headers';

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;

  return (
    <html lang='fr' className={theme === 'dark' ? 'dark' : undefined}>
      <body className='relative min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white w-full flex flex-col'>
        <div className='relative z-10 flex flex-col flex-1'>
          <Header initialIsDark={theme === 'dark'} />
          <main className='flex-1 relative'>{children}</main>
        </div>
      </body>
    </html>
  );
}
