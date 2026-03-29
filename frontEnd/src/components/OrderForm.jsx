import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const OrderForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [checkoutData, setCheckoutData] = useState({ items: [], total: 0 });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart');
        const items = response.data || [];
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setCheckoutData({ items, total });
      } catch (error) {
        console.error('Failed to load cart items:', error);
      }
    }
    fetchCartItems();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkoutData.items.length) {
      toast.error('Your cart is empty. Add items first.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        orderItems: checkoutData.items.map((item) => ({
          itemCode: item.itemCode,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const res = await axios.post('http://localhost:3000/order/placeorder', payload);
      setIsError(false);
      setMessage(res.data.message || 'Order placed successfully');
      toast.success('Order placed successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setFormData({ name: '', email: '', phone: '', address: '' });
      setCheckoutData({ items: [], total: 0 });
      setTimeout(() => navigate('/menu', { replace: true }), 2500);
    } catch (error) {
      setIsError(true);
      setMessage(error?.response?.data?.message || 'Unable to place order. Please try again.');
      toast.error(message || 'Unable to place order. Please try again.', {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    }
  }

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-[#081C13] via-[#0C2E20] to-[#071c12] py-12'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col gap-4 mb-8 text-center'>
          <p className='text-sm text-emerald-300/80 uppercase tracking-[0.3em]'>Secure Checkout</p>
          <h1 className='text-4xl md:text-5xl font-bold text-white'>Complete your order</h1>
          <p className='max-w-2xl mx-auto text-gray-300'>Review your cart, complete your contact details, and submit the order. You will see a confirmation toast when the order is successfully placed.</p>
        </div>

        <div className='grid gap-8 lg:grid-cols-[1.2fr_1fr]'>
          <section className='bg-[#0f2f24] border border-green-900 rounded-3xl p-8 shadow-xl'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h2 className='text-2xl font-semibold text-white'>Order summary</h2>
                <p className='mt-2 text-sm text-gray-400'>{checkoutData.items.length} item{checkoutData.items.length !== 1 ? 's' : ''} ready to order</p>
              </div>
              <span className='text-lg font-bold text-emerald-300'>₹{checkoutData.total}</span>
            </div>

            {checkoutData.items.length ? (
              <div className='space-y-4'>
                {checkoutData.items.map((item) => (
                  <div key={item._id} className='flex items-center gap-4 p-4 rounded-3xl bg-[#122d20]'>
                    <img src={item.image} alt={item.title} className='w-20 h-20 rounded-2xl object-cover border border-green-800' />
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
                      <p className='text-sm text-gray-400'>Qty: {item.quantity}</p>
                    </div>
                    <p className='text-white font-semibold'>₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className='p-6 rounded-3xl bg-[#07170f] border border-green-900 text-center'>
                <p className='text-gray-300 mb-4'>No checkout items found.</p>
                <NavLink to='/menu' className='inline-flex px-4 py-2 bg-emerald-500 text-black rounded-full font-semibold hover:bg-emerald-400 transition'>Shop Menu</NavLink>
              </div>
            )}
          </section>

          <section className='bg-[#0f2f24] border border-green-900 rounded-3xl p-8 shadow-xl'>
            <h2 className='text-2xl font-semibold text-white mb-4'>Your details</h2>
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='space-y-2'>
                <label className='text-sm text-gray-300' htmlFor='name'>Full Name</label>
                <input value={formData.name} onChange={handleChange} className='w-full rounded-3xl border border-green-800 bg-[#081912] px-4 py-3 text-white outline-none focus:border-emerald-400' type='text' name='name' id='name' placeholder='John Doe' required />
              </div>

              <div className='space-y-2'>
                <label className='text-sm text-gray-300' htmlFor='email'>Email</label>
                <input value={formData.email} onChange={handleChange} className='w-full rounded-3xl border border-green-800 bg-[#081912] px-4 py-3 text-white outline-none focus:border-emerald-400' type='email' name='email' id='email' placeholder='example@mail.com' required />
              </div>

              <div className='space-y-2'>
                <label className='text-sm text-gray-300' htmlFor='phone'>Phone Number</label>
                <input value={formData.phone} onChange={handleChange} className='w-full rounded-3xl border border-green-800 bg-[#081912] px-4 py-3 text-white outline-none focus:border-emerald-400' type='tel' name='phone' id='phone' placeholder='+92 300 1234567' required />
              </div>

              <div className='space-y-2'>
                <label className='text-sm text-gray-300' htmlFor='address'>Delivery Address</label>
                <textarea value={formData.address} onChange={handleChange} className='w-full min-h-[120px] rounded-3xl border border-green-800 bg-[#081912] px-4 py-3 text-white outline-none focus:border-emerald-400 resize-none' name='address' id='address' placeholder='Street, City, ZIP code' required />
              </div>

              {message && (
                <p className={isError ? 'text-red-500 font-medium' : 'text-emerald-300 font-medium'}>{message}</p>
              )}

              <div className='flex flex-col sm:flex-row gap-4'>
                <button type='submit' className='w-full sm:w-auto px-6 py-3 bg-emerald-500 text-black font-semibold rounded-3xl hover:bg-emerald-400 transition'>
                  Confirm Order
                </button>
                <NavLink to='/cart' className='inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-green-700 text-white rounded-3xl hover:bg-white/5 transition'>Back to Cart</NavLink>
              </div>
            </form>
          </section>
        </div>
      </div>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
    </div>
  )
}

export default OrderForm;
