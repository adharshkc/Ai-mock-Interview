import React from 'react'
import Header from './_components/Header';
import { Toaster } from 'sonner';
import DashboardData from './_components/DashboardData';

function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
      <DashboardData/>
      <div className='mx-5 md:mx-20 lg:mx-36'>
        <Toaster />
          {children}
      </div>
      
    </div>
  )
}

export default DashboardLayout;
