export interface ICart {
  cartItems: ICartItem[];
  cartTotalPrice: number;
  cartQuantity: number;
}

export interface ICartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  totalPrice: number;
  amount: number;
}
