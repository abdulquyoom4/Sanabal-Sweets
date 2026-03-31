import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('/contact/admin/messages');
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    }

    getMessages();
  }, []);

  return (
    <div className='min-h-screen bg-[#04151e] text-white py-10'>
      <div className='max-w-5xl mx-auto px-4 space-y-6'>
        <header className='rounded-3xl border border-sky-700 bg-[#0a1f2f]/85 p-6'>
          <p className='text-sm uppercase tracking-[0.2em] text-sky-300'>Admin Messages</p>
          <h1 className='mt-3 text-3xl font-bold'>Messages</h1>
          <p className='mt-3 text-sm text-gray-400'>{messages.length} received</p>
        </header>

        {messages.length === 0 ? (
          <div className='rounded-2xl border border-sky-700 bg-[#071623] p-6 text-center text-gray-300'>
            No messages yet.
          </div>
        ) : (
          <div className='space-y-4'>
            {messages.map((message, index) => (
              <article key={message._id} className='rounded-2xl border border-sky-700 bg-[#0b2233]/90 p-5'>
                <div className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start'>
                  <div>
                    <h2 className='text-xl font-semibold text-white'>{message.name}</h2>
                    <p className='text-sm text-gray-400'>{message.email}</p>
                  </div>
                  <span className='rounded-full bg-sky-500/10 px-3 py-1 text-sm text-sky-200'>#{index + 1}</span>
                </div>
                <p className='mt-4 text-gray-300'>{message.message}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
