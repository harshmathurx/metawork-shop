import useCart from '../store/store';
import axios from 'axios';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const addTocart = useCart((state) => state.addTocart);
  const updatecart = useCart((state) => state.updatecart);
  const mycart = useCart((state) => state.cartContent);
  const [products,setProducts] = useState([]);
  
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
  },[])

  return (
    <>
      <Header />
      <div className="container mx-auto pt-4">
        <div className="pb-4">PRODUCTS</div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a
              key={product.id}
              href="#"
              onClick={() =>
                addProduct({
                  ...product,
                  quantity: 1,
                })
              }
              className="group"
            >
              <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
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
            </a>
          ))}
        </div>
      </div>
    </>
  );
}