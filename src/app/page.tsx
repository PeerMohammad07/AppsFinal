"use client"

import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';
import Table from '@/components/Table';
import Navbar from '@/components/Navbar';


export default function Home() {
  return (
    <>
      <AppProvider i18n={{}}>
        <Navbar/>
        <div className='p-12'>
        <Table />
        </div>
      </AppProvider>
    </>
  )
}
