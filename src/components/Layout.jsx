import React from 'react'
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}

export default Layout