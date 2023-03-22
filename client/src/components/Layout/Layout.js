import React from 'react'
import Footer from './Footer';
import Header from './Header';

function Layout({children}) {
  return (
    <div>
        <Header />
      <main style={{minHeight:"80vh"}}>
      <h1>{children}</h1>
      </main>
        <Footer />
    </div>
  )
}

export default Layout
