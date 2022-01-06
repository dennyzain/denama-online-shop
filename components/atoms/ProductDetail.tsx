import React from 'react';
import Image from 'next/image';
import router from 'next/router';
import { useSelector } from 'react-redux';
// local
import { useAppDispatch } from '../redux/store';
import { IProduct } from '../interfaces/Product';
import { RootState } from '../redux/reducers';
import { addProductToCart, removeProductFromCart } from '../redux/product';
import { BiSearch, BiMenuAltLeft, BiCartAlt, BiArrowBack } from 'react-icons/bi';
import CartModal from '../organism/CartModal';
import { getStars } from '../utils/Stars';

const ProductDetail: React.FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const productItems = useSelector((state: RootState) => state.product);
  const ui = useSelector((state: RootState) => state.UI);
  const existCartProduct = productItems.cartItems.findIndex((item) => item.id === product.id);
  const addCartHandler = () => {
    if (existCartProduct === -1) {
      dispatch(addProductToCart(product));
    } else {
      dispatch(removeProductFromCart(product.id));
    }
  };
  return (
    <div className="flex h-auto mx-20 border-box">
      <div className="w-5 h-1 m-2">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center font-semibold rounded-lg bg-blue-300 p-1 px-3"
        >
          <BiArrowBack /> back
        </button>
      </div>
      {ui.isCart && <CartModal data={productItems} />}
      <div className="flex items-center p-20  border-r-2 border-black ">
        <Image
          className="object-contain "
          layout="fixed"
          src={product.image}
          quality={100}
          alt={product.title}
          width={300}
          height={400}
          blurDataURL={product.image}
          placeholder="blur"
        />
      </div>
      <div className="m-12 p-2 grid grid-cols-4 grid-rows-8 gap-2 w-72 text-center ">
        <h3 className="col-start-1 col-span-4 row-start-3 self-end text-xl font-bold">
          {product.title}
        </h3>
        <p className="col-start-1 row-start-4 col-span-4 row-span-2 text-sm self-start ">
          {product.description}
        </p>
        <h2 className="col-start-1 row-start-5 col-span-2 text-2xl  justify-self-start self-end font-bold ">
          ${product.price}
        </h2>
        <div className="col-start-1 col-span-2  row-start-6 flex justify-start items-center">
          {getStars(product.rating.rate).map((star, index) => {
            return (
              <div key={index}>
                <p>{star}</p>
              </div>
            );
          })}
          <p className="ml-1 text-lg">{product.rating.rate}</p>
        </div>
        <button
          onClick={() => addCartHandler()}
          className=" row-start-7 col-span-4 col-start-1 rounded-lg h-10  bg-blue-300 p-1 flex justify-center items-center text-lg "
        >
          <BiCartAlt className="mx-2" /> add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductDetail;
