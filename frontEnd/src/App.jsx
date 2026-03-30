import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AdminNavbar from './pages/Admin/AdminNavbar'
import Messages from './pages/Admin/Messages'
import ManageMenu from './pages/Admin/ManageMenu'
import Orders from './pages/Admin/Orders'
import { ProtectedRoute, AdminRoute } from './components/AuthRoutes'

const App = () => {
  const routes = createBrowserRouter(
    [
      {path: '/', element: <><Navbar/><Banner/><Footer/></>},
      {path: '/menu', element: <><Navbar /><Menu /><Footer/></>},
      {path: '/orderform', element: <ProtectedRoute><><Navbar /><OrderForm /><Footer/></></ProtectedRoute>},
      {path: '/contact', element: <><Navbar /><Contact /><Footer/></>},
      {path: '/cart', element: <ProtectedRoute><><Navbar /><Cart /><Footer/></></ProtectedRoute>},
      {path: '/login', element: <><Navbar /><Login /><Footer/></>},
      {path: '/signup', element: <><Navbar /><SignUp /><Footer/></>},
      {path: '/admin', element: <AdminRoute><AdminNavbar /></AdminRoute>},
      {path: '/admin/messages', element: <AdminRoute><><AdminNavbar /><Messages /></></AdminRoute> },
      {path: '/admin/menu', element: <AdminRoute><><AdminNavbar /><ManageMenu /></></AdminRoute> },
      {path: '/admin/orders', element: <AdminRoute><><AdminNavbar /><Orders /></></AdminRoute> }
    ]
  )
  return (
   <>
    <div>
      <RouterProvider router={routes} />
    </div>
   </>
  )
}

export default App
