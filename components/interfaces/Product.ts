export interface IProduct {
  [x: string]: any;
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}
