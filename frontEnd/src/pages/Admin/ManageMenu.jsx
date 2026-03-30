import axios from "axios";
import { useState, useEffect } from "react";

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    itemCode: "",
    title: "",
    price: "",
    category: "",
    image: "",
    quantity: "",
  });

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get("/items");
        setMenuItems(res.data);
      } catch {
        console.log("something wrong occured");
      }
    };
    getItems();
  }, []);

  const totalStock = menuItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const outOfStockCount = menuItems.filter((item) => Number(item.quantity) <= 0).length;
  const categoryCount = [...new Set(menuItems.map((item) => item.category))].length;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddition = async (e) => {   
    e.preventDefault();
    try {
      const res = await axios.post(
        "/items/admin/menu",
        formData,
      );
      setMessage(res.data.message);
      setFormData({
        itemCode: "",
        title: "",
        price: "",
        category: "",
        image: "",
        quantity: 0,
      });
      setMenuItems([...menuItems, res.data]);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete("/items/admin/menu", {
        data: { itemCode: formData.itemCode },
      });
      setMessage(res.data.message);
      setMenuItems(
        menuItems.filter((item) => item.itemCode !== formData.itemCode),
      );
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-[#07120d] text-white px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-emerald-800 bg-[#09160f] p-6">
          <h1 className="text-3xl font-bold">Manage Menu</h1>
          <p className="mt-2 text-gray-300">Add or remove items, and review stock at a glance.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-400">
            <span>{menuItems.length} items</span>
            <span>{totalStock} total stock</span>
            <span>{outOfStockCount} out of stock</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-3xl border border-emerald-800 bg-[#091b12] p-5">
            <div className="flex flex-wrap gap-3">
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  showAdd ? 'bg-emerald-500 text-black' : 'border border-emerald-600 text-white hover:bg-emerald-600/20'
                }`}
                onClick={() => {
                  setShowAdd(true)
                  setShowDelete(false)
                }}
              >
                Add Item
              </button>
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  showDelete ? 'bg-red-500 text-black' : 'border border-red-600 text-white hover:bg-red-600/20'
                }`}
                onClick={() => {
                  setShowDelete(true)
                  setShowAdd(false)
                }}
              >
                Delete Item
              </button>
            </div>

            {showAdd && (
              <form onSubmit={handleAddition} className="mt-6 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    name="itemCode"
                    placeholder="Item Code"
                    value={formData.itemCode}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-emerald-700 bg-[#07180f] px-4 py-3 text-white outline-none"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-emerald-700 bg-[#07180f] px-4 py-3 text-white outline-none"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-emerald-700 bg-[#07180f] px-4 py-3 text-white outline-none"
                  />
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-emerald-700 bg-[#07180f] px-4 py-3 text-white outline-none"
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-emerald-700 bg-[#07180f] px-4 py-3 text-white outline-none"
                  />
                </div>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-emerald-700 bg-[#07180f] px-4 py-3 text-white outline-none"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Sweets">Sweets</option>
                  <option value="Cakes">Cakes</option>
                  <option value="Chocolates">Chocolates</option>
                </select>
                {message && <p className="text-sm text-red-400">{message}</p>}
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-black">
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="rounded-2xl border border-gray-600 px-5 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {showDelete && (
              <form onSubmit={handleDelete} className="mt-6 space-y-4">
                <input
                  type="text"
                  name="itemCode"
                  placeholder="Item Code"
                  value={formData.itemCode}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-red-600 bg-[#071213] px-4 py-3 text-white outline-none"
                />
                {message && <p className="text-sm text-red-400">{message}</p>}
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-red-500 px-5 py-2 text-sm font-semibold text-black">
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDelete(false)}
                    className="rounded-2xl border border-gray-600 px-5 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </section>

          <section className="rounded-3xl border border-emerald-800 bg-[#091d13] p-5">
            <h2 className="text-2xl font-semibold">Menu Items</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-400">
                    <th className="pb-3">Code</th>
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item._id} className="border-t border-transparent hover:border-emerald-700/40">
                      <td className="py-3 text-gray-200">{item.itemCode}</td>
                      <td className="py-3 text-gray-200">{item.title}</td>
                      <td className="py-3 text-gray-200">{item.category}</td>
                      <td className="py-3 text-gray-200">{item.price}</td>
                      <td className={`py-3 font-semibold ${Number(item.quantity) > 0 ? 'text-emerald-300' : 'text-red-400'}`}>
                        {Number(item.quantity) > 0 ? item.quantity : 'Out of stock'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
