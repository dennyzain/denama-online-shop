import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICart } from '../interfaces/Cart';
import {
  decreaseProductAmount,
  increaseProductAmount,
  removeProductFromCart,
} from '../redux/actions';
import { RootState } from '../redux/reducers';
import { showCart } from '../redux/UI';

const CartModal: React.FC<{ data: ICart }> = ({ data }) => {
  const dispatch = useDispatch();
  const ui = useSelector((state: RootState) => state.UI);
  const { cartItems, cartQuantity, cartTotalPrice } = data;
  return (
    <div className="container w-10/12 h-auto mx-auto top-14 bg-gray-200 z-40 fixed shadow-2xl rounded-lg ">
      <div className="flex my-10 ">
        <div className="w-3/4  px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartQuantity} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Total
            </h3>
          </div>
          <div className="overflow-y-auto h-72">
            {cartItems.length > 0 ? (
              cartItems.map((cartItem) => {
                return (
                  <div
                    key={cartItem.id}
                    className="flex items-center hover:bg-gray-100 -mx-8 px-9 py-5"
                  >
                    <div className="flex w-2/5 box-border p-2 bg-white justify-center">
                      <img
                        className="h-24 w-20 object-contain"
                        src={cartItem.image}
                        alt={cartItem.image}
                      />
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{cartItem.title}</span>
                        <p
                          onClick={() => dispatch(removeProductFromCart(cartItem.id))}
                          className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs"
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5 items-center">
                      <div onClick={() => dispatch(decreaseProductAmount(cartItem.id))}>
                        <svg
                          className="fill-current cursor-pointer text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>
                      <div className="m-1 p-1">{cartItem.amount}</div>
                      <div onClick={() => dispatch(increaseProductAmount(cartItem.id))}>
                        <svg
                          className="fill-current cursor-pointer text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${cartItem.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${Math.round(cartItem.totalPrice)}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center text-xl">
                <p> cart is empty</p>
              </div>
            )}
          </div>

          <a
            onClick={() => dispatch(showCart(!ui.isCart))}
            className="flex font-semibold cursor-pointer text-sm mt-10 animate-bounce"
          >
            <svg className="fill-current mr-2 text-blue-300 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </a>
        </div>

        <div className="w-1/4 px-8 py-10 bg-white">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-lg uppercase">Items {cartQuantity}</span>
            <span className="font-semibold text-lg">${Math.round(cartTotalPrice)}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full bg-gray-200"
            />
          </div>
          <button className="bg-red-500 rounded-lg hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-lg uppercase">
              <span>Total cost</span>
              <span>${Math.round(cartTotalPrice)}</span>
            </div>
            <button className="rounded-lg bg-blue-300 font-semibold hover:bg-blue-200 py-3 text-sm uppercase w-full animate-bounce">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
