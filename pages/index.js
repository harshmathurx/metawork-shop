import useCart from '../store/store';
import axios from 'axios';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const addTocart = useCart((state) => state.addTocart);
  const updatecart = useCart((state) => state.updatecart);
  const mycart = useCart((state) => state.cartContent);
  const [products, setProducts] = useState([]);

  const addProduct = (params) => {
    const product = mycart.findIndex((item) => item.id === params.id);
    if (product !== -1) {
      mycart[product].quantity++;
      updatecart({ params, mycart });
    } else {
      addTocart(params);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('https://dummyjson.com/products')
      setProducts(response.data.products)
    }
    getProducts()
  }, [])

  return (
    <>
      <Header />
      <div className="w-9/12 mx-auto pt-4">
        <div className="pb-4">PRODUCTS</div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              href="#"
              className="group rounded-md bg-white shadow-lg flex flex-col h-80 justify-evenly p-5"
            >
              <div className="rounded-lg overflow-hidden h-40 flex flex-col items-center">
                <Image
                  src={product?.images[0]}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.price}
              </p>
              <button onClick={() =>
                addProduct({
                  ...product,
                  quantity: 1,
                })
              } class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
                to cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}