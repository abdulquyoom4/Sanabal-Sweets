import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('/order/getorder')
        setOrders(res.data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    getOrders()
  }, [])

  const totalRevenue = orders.reduce((acc, order) => {
    const orderTotal = order.orderItems?.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0
    return acc + orderTotal
  }, 0)

  return (
    <div className='min-h-screen bg-[#04140c] text-white py-10'>
      <div className='max-w-6xl mx-auto px-4 space-y-6'>
        <header className='rounded-3xl border border-emerald-700 bg-[#0b1d14]/80 p-6'>
          <p className='text-sm uppercase tracking-[0.2em] text-emerald-300'>Admin Orders</p>
          <h1 className='mt-3 text-3xl font-bold'>Orders</h1>
          <div className='mt-4 flex flex-wrap gap-4 text-sm text-gray-300'>
            <span>Total orders: {orders.length}</span>
            <span>Total revenue: ₹{totalRevenue}</span>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className='rounded-2xl border border-emerald-700 bg-[#0f241a] p-6 text-center text-gray-300'>
            No orders yet.
          </div>
        ) : (
          <div className='space-y-4'>
            {orders.map((order) => {
              const orderTotal = order.orderItems?.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0
              return (
                <article key={order._id} className='rounded-2xl border border-emerald-700 bg-[#0f2f24]/95 p-5'>
                  <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                      <h2 className='text-xl font-semibold text-white'>{order.name}</h2>
                      <p className='text-sm text-gray-300'>{order.email} · {order.phone}</p>
                      <p className='mt-2 text-gray-400 text-sm'>Order ID: {order._id}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm text-gray-400'>Total</p>
                      <p className='text-xl font-semibold text-emerald-300'>₹{orderTotal}</p>
                    </div>
                  </div>
                  <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                    <p className='text-gray-300 text-sm'>Items: {order.orderItems?.length || 0}</p>
                    <p className='text-gray-300 text-sm'>Address: {order.address}</p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
