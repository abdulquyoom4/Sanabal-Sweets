import { NavLink } from 'react-router-dom'

const AdminNavbar = () => {
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-emerald-500 text-black' : 'text-gray-300 hover:bg-white/10'
    }`

  return (
    <div className='bg-[#09120f] border-b border-emerald-800 shadow-sm'>
      <nav className='mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300 text-xl font-bold'>A</div>
          <div>
            <h1 className='text-xl font-bold text-white'>Admin Panel</h1>
            <p className='text-sm text-gray-400'>Manage orders, messages, and menu content.</p>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <NavLink to='/admin/orders' className={linkClass}>Orders</NavLink>
          <NavLink to='/admin/menu' className={linkClass}>Menu</NavLink>
          <NavLink to='/admin/messages' className={linkClass}>Messages</NavLink>
        </div>

        <NavLink to='/login' className='inline-flex items-center justify-center rounded-full border border-emerald-700 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10'>
          Back
        </NavLink>
      </nav>
    </div>
  )
}

export default AdminNavbar
