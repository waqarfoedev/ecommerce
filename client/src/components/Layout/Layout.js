import React from 'react'
import Footer from './Footer';
import Header from './Header';

const Layout=({children})=> {
  return (
    <>
        <Header />
      <main style={{minHeight:"70vh"}}>
      <h1>{children}</h1>
      </main>
        <Footer />
    </>
  )
}

export default Layout
