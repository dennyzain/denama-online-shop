import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { BiCartAlt } from 'react-icons/bi';
// local
import { IProduct } from '../interfaces/Product';
import { RootState } from '../redux/reducers';
import { useAppDispatch } from '../redux/store';
import { addProductToCart, removeProductFromCart } from '../redux/actions';
import { getStars } from '../utils/Stars';

interface Props {
  route: () => void;
  product: IProduct;
}

const Product: React.FC<Props> = ({ route, product }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const productItems = useSelector((state: RootState) => state.product.cartItems);
  const existCartProduct = productItems.findIndex((item) => item.id === product.id);
  const addCartHandler = () => {
    if (existCartProduct === -1) {
      dispatch(addProductToCart(product));
    } else {
      dispatch(removeProductFromCart(product.id));
    }
  };

  return (
    <div className="w-42 flex h-auto p-3 m-4 flex-col bg-white shadow-lg rounded box-border  transform hover:scale-100  ">
      <div className=" flex justify-center">
        <Image
          className="object-contain "
          layout="fixed"
          src={product.image}
          quality={80}
          alt={product.title}
          width={200}
          height={250}
          blurDataURL={product.image}
          placeholder="blur"
        />
      </div>
      <div className="m-5 p-2  grid grid-cols-3 grid-rows-5 gap-2 border-box">
        <p className="col-start-1 row-span-2 col-span-3 flex flex-col items-center text-left text-sm line-clamp-2">
          {product.title}
        </p>
        <p className="row-start-3 font-bold">${product.price}</p>
        <div className="row-start-4 col-span-2 font-bold flex flex-wrap items-center">
          {getStars(product.rating.rate).map((star, index) => (
            <div key={index}>
              <p>{star}</p>
            </div>
          ))}
          <p className="ml-1 text-lg">{product.rating.rate}</p>
        </div>
        <button
          onClick={() => addCartHandler()}
          className=" row-start-5 col-span-2 col-start-2 rounded-lg  bg-blue-300 p-1 flex items-center justify-center text-sm hover:bg-gray-400  "
        >
          <BiCartAlt /> add to cart
        </button>
        <button
          onClick={route}
          className=" row-start-5 col-start-1 rounded-lg  bg-blue-300 p-1 flex items-center justify-center text-xs  "
        >
          show detail
        </button>
      </div>
    </div>
  );
};

export default Product;
