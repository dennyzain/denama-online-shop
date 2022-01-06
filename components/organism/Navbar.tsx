import React, { useEffect } from 'react';
import { BiSearch, BiMenuAltLeft, BiCartAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
// local
import { useAppDispatch } from '../redux/store';
import { showCart, loadCartFromLocalStorage } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { HeadMeta } from '../atoms/HeadMeta';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateGlobal = useSelector((state: RootState) => state);
  const { UI, product } = stateGlobal;
  useEffect(() => {
    const local: string | null = localStorage.getItem('CART');
    if (local) {
      const cartLocal = JSON.parse(local);
      dispatch(loadCartFromLocalStorage(cartLocal));
    }
  }, []);
  return (
    <>
      <HeadMeta />
      <div className="grid grid-cols-6 grid-rows-2   ">
        <div className="text-lg flex justify-center items-center col-start-2 col-span-4 h-12 border-black tracking-wider">
          <p className="font-bebas ">Denama Shop</p>
        </div>
        <div className="text-2xl border-r border-black flex justify-center items-center col-start-1 row-start-1">
          <BiSearch />
        </div>
        <div className="text-2xl border-l  p-2 border-box border-black flex justify-center items-center col-start-6 row-start-1">
          <div onClick={() => dispatch(showCart(!UI.isCart))} className="relative">
            <BiCartAlt />
            <span className="inline-flex  items-center justify-center px-2 py-1 text-xs absolute -top-2 left-4 font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {product && product.cartQuantity}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center row-start-2 col-span-4 col-start-2 border-b border-t border-black">
          <p className="mx-4 text-sm">Electronics</p>
          <p className="mx-4 text-sm">Women</p>
          <p className="mx-4 text-sm">Men</p>
          <p className="mx-4 text-sm">Hot Sale</p>
        </div>
        <div className=" border-b border-r border-t col-start-1 row-start-2 flex justify-center items-center row-span-2 border-black">
          <p className="font-bebas text-3xl">Denama</p>
        </div>
        <div className="flex justify-center items-center border-t border-b border-l col-start-6 row-start-2  row-span-2 border-black">
          <p className="text-lg ">
            <BiMenuAltLeft />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 p-1 border-b border-black ">
        <p className="col-start-2 text-center">categories</p>
        <p className="col-start-3 text-center">categories</p>
        <p className="col-start-4 text-center">categories</p>
        <p className="col-start-5 text-center">categories</p>
        <p className="col-start-6 text-center">categories</p>
      </div>
    </>
  );
};
export default Navbar;
