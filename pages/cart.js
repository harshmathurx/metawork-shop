import Header from '@/components/header';
import useCart from '../store/store';
import { useEffect, useState } from 'react';

export default function Home() {
    const total = useCart((state) => state.total);
    const cart = useCart((state) => state.cartContent);
    const removeFromCart = useCart((state) => state.removeFromCart);
    const updateCart = useCart((state) => state.updatecart);
    const reduceProduct = useCart((state) => state.reduceProduct);
    const [mycart, setCart] = useState([]);
    const [mytotal, setTotal] = useState();
    useEffect(() => {
        setCart(cart);
        setTotal(total);
    }, [cart, total]);

    return (
        <>
            <Header />
            <div className="container mx-auto pt-4">MY CART</div>
            <div className="flex flex-col w-1/2 mx-auto gap-y-1">
                <div className="flex flex-row justify-between mb-4">
                    <span className="basis-1/4 uppercase font-bold">Product</span>
                    <span className="basis-1/4 text-right uppercase font-bold">
                        Price
                    </span>
                    <span className="basis-1/4 text-right uppercase font-bold pr-2">Qty</span>
                    <span className="basis-1/4 text-right uppercase font-bold"></span>
                </div>
                {mycart.map((item, key) => (
                    <div key={key} className="flex flex-row justify-between ">
                        <span className="basis-1/4">{item?.title}</span>
                        <span className="basis-1/4 text-right">
                            $ {item.price * item.quantity}
                        </span>
                        <div class="basis-1/4 text-right flex justify-end">
                            <span class="font-semibold cursor-pointer" onClick={() => {
                                const productId = mycart.findIndex((product) => product.id === item.id);
                                if (mycart[productId].quantity <= 1) {
                                    setCart(mycart.filter((product) => product.id !== item.id))
                                    reduceProduct({
                                        params: {
                                            ...item,
                                            quantity: 1,
                                        }, mycart
                                    })
                                } else {
                                    mycart[productId].quantity--;
                                    reduceProduct({
                                        params: {
                                            ...item,
                                            quantity: 1,
                                        }, mycart
                                    })
                                }
                            }}>-</span>
                            <input type="text" class="focus:outline-none bg-gray-100 border h-6 w-5 rounded text-sm px-1 mx-1" value={item.quantity} />
                            <span class="font-semibold cursor-pointer" onClick={() => {
                                const productId = mycart.findIndex((product) => product.id === item.id);
                                mycart[productId].quantity++;
                                updateCart({
                                    params: {
                                        ...item,
                                        quantity: 1,
                                    }, mycart
                                })
                            }}>+</span>
                        </div>
                        <span className="basis-1/4 text-right">
                            <button
                                className="p-2 bg-slate-200"
                                onClick={() =>
                                    removeFromCart({
                                        id: item.id,
                                        price: item.price,
                                        quantity: item.quantity,
                                    })
                                }
                            >
                                X
                            </button>
                        </span>
                    </div>
                ))}
                <div className="flex flex-row justify-between mt-4 border-t-2">
                    <span className="basis-full text-right uppercase font-bold">
                        Total: ${mytotal}
                    </span>
                </div>
            </div>
        </>
    );
}