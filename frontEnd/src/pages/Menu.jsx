import {useState, useEffect} from 'react';
import Card from '../components/Card';
import axios from 'axios';

const Menu = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      const getItems = async () => { 
        const res = await axios.get('http://localhost:3000/items')
        setItems(res.data);
      }
   getItems();
  }, [])

  const categories = items.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const categoryNames = Object.keys(categories).sort();
  
  return (
    <>
  
      {categoryNames.length === 0 ? (
        <p className="text-center text-gray-300 mt-10">Loading menu...</p>
      ) : (
        categoryNames.map((category) => (
          <section key={category} className="mb-16">
            <h3 className="text-3xl font-semibold text-center text-yellow-500 mt-8">
              ---- {category} ----
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:gap-6 px-4 snap-x snap-mandatory">
              {categories[category].map((item) => (
                <div key={item._id} className="min-w-full  shrink-0 snap-start">
                  <Card
                    itemCode={item.itemCode}
                    title={item.title}
                    category={item.category}
                    image={"/images/" + item.image}
                    price={item.price}
                  />
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  )
} 

export default Menu
