import React from 'react'
import { HiHome } from 'react-icons/hi'
import { Breadcrumb } from 'flowbite-react'
const Dashboard = () => {
  return (
    <main>
    <div className="flex-1 py-6">
      <Breadcrumb aria-label="Orders page" className="ml-[48px] mb-4">
        <Breadcrumb.Item href="/admin" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#"></Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-3xl font-medium ml-[50px]">Buyurtmalar</h1>
      <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
        <div className="overflow-x-auto w-full rounded-lg border">
        </div>
      </div>
    </div>
  </main>
  )
}

export default Dashboard