import React from 'react'
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>TechShop Ecommerce</title>
                <meta name="description" content="TechShop  Ecommerce Site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}

export default Layout