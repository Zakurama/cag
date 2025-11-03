/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function HomeButton() {
  return (
    <Link href='/'>
      <img src='/home-icon.svg' alt='Home' height={20} width={20} />
    </Link>
  );
}
