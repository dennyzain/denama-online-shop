import React from 'react';
import { GetStaticProps } from 'next';
import { IProduct } from '../../components/interfaces/Product';
import ProductDetail from '../../components/atoms/ProductDetail';
import Navbar from '../../components/organism/Navbar';

const ProductsID: React.FC<{ product: IProduct }> = ({ product }): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="h-screen items flex justify-center">
        <ProductDetail product={product} />
      </div>
    </>
  );
};
export default ProductsID;

export async function getStaticPaths() {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  const paths = data.map((product: IProduct) => ({
    params: {
      id: `${product.id}`,
    },
  }));
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id } = context.params!;
  const res: Response = await fetch(`https://fakestoreapi.com/products/` + id);
  const product: IProduct = await res.json();
  return { props: { product } };
};
