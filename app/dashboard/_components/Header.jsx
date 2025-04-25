"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    })
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} width={160} height={100} alt='logo'/>
      <ul className='hidden md:flex gap-6'>
        <Link href={'/dashboard'}>
        {/*  <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}> */}
      <li className={`transition-all cursor-default hover:text-primary hover:font-bold ${
          path === '/dashboard' ? 'text-primary font-bold' : '' }`}
            >DashBoard</li>
            </Link>
            <Link href={'/dashboard/questions'}>
        <li className={`transition-all cursor-default hover:text-primary hover:font-bold ${
          path === '/dashboard/questions' ? 'text-primary font-bold' : '' }`}>Questions</li>
          </Link>
          {/* <Link href={'/dashboard/upgrade'}>
        <li className={`transition-all cursor-default hover:text-primary hover:font-bold ${
          path === '/dashboard/upgrade' ? 'text-primary font-bold' : '' }`}>Upgrade</li>
          </Link> */}
          <Link href={'/dashboard/how'}>
        <li className={`transition-all cursor-default hover:text-primary hover:font-bold ${
          path === '/dashboard/how' ? 'text-primary font-bold' : '' }`}>How it works?</li>
          </Link>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
