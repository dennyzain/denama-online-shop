import React from 'react';
import type { GetStaticProps } from 'next';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

// * Local
import { RootState } from '../components/redux/reducers';
import { IProduct } from '../components/interfaces/Product';
import Navbar from '../components/organism/Navbar';
import Product from '../components/atoms/Product';
import CartModal from '../components/organism/CartModal';
import Hero from '../components/atoms/Hero';

const container = {
  hidden: { opacity: 0, y: '200%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  exit: { opacity: 0 },
};

const Home: React.FC<{ product: IProduct }> = ({ product }) => {
  const router = useRouter();
  const stateGlobal = useSelector((state: RootState) => state);
  const { UI, product: cart } = stateGlobal;

  return (
    <AnimatePresence>
      <motion.div variants={container} initial="initial" animate="visible" exit="exit">
        <Navbar />
        <Hero />
        {UI.isCart && <CartModal data={cart} />}
        <div className="flex flex-wrap justify-center bg-gray-200  ">
          {product.map((data: IProduct) => {
            return (
              <div key={data.id} className="flex-initial">
                <Product route={() => router.push(`/products/${data.id}`)} product={data} />
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const product: IProduct = await res.json();
  return {
    props: {
      product,
    },
  };
};
