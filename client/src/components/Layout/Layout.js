import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, Keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='Keywords' content={Keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "60vh" }}>
        <ToastContainer />
        <h1>{children}</h1>
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "W-Ecom app",
  description: 'online shopping website all over the world',
  Keywords: 'shopping,	online shopping, eshop, clothing stores, online shop, shopping online, online shopping sites, shop online, furniture online, ecommerce website, online boutiques, clothes shops, clothes online, shopping sites, online shopping websites, online clothing stores, clothing websites, online sale, online furniture, online clothes shopping, cheap online shopping, online clothing, online furniture stores, shopping websites, buy online, best online shopping, cheap online shopping sites, fashion shop, top 10 online shopping sites, clothes shopping, womens clothing websites, online clothing boutiques, best online shopping sites, online shopping for women, clothing stores online, online fashion, cheap clothing websites, buy furniture online, shoes online shopping, best online shopping sites for womens clothing, online shopping clothes, online purchase, online shopping sites for clothes, online dress shopping, buy clothes online, best online shopping websites, fashion online, cheap online clothing stores, fashion websites, online shoes shopping, online shopping sites list, online shopping shoes, dresses online shopping, cheap online clothing, cheap online shopping websites, online retailers, e commerce sites, clothes shopping online, womens online shopping, best online clothing stores, online dress shops, online furniture shopping, freewebstore, online shopping fashion, online selling sites, store online, internet shop, online shopping dresses, online fashion store, clothing shop online, www online shopping, shopping online sites, clothes online shopping, indian online shopping, best shopping sites, online clothes shopping sites, internet shopping, cheap online stores, online shopping for men, best online stores, shop online clothes, online buy, best online shops, online clothes shops, shopping stores, best online boutiques, online sites, womens fashion online, online dress stores, cheap online shopping australia, shopping on line, top online shopping sites, online shopping stores, shop clothes online, shopping clothes, online fashion boutiques, fashion online shop, online shopping usa, fashion online shopping, shopping online clothe',
  author: "Waqar Dev"
};
export default Layout;
