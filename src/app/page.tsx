"use client"

import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';
import Table from '@/components/Table';


export default function Home() {
  return (
    <>
      <AppProvider i18n={{}}>
        <Table />
      </AppProvider>
    </>
  )
}
