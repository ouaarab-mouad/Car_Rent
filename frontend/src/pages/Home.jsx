import React from 'react'
import { Navbar } from '../fixed/Navbar';
import { Footer } from '../fixed/Footer';


export const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className='content' >
            <h1>Content</h1>
        </div>
        <Footer/>
    </div>
  )
}
