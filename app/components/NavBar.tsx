import React from 'react'

const NavBar = () => {
  return (
    <nav className="bg-[#ededed] flex flex-row p-7 space-x-5 w-full">
      <a href="/" className="site-title">
        <div className="font-[550]">
          Studoku
        </div>
      </a>
      <a href="/" className="product">
        <div>Resources</div>
      </a>
      <a href="/" className="download-app">
        <div>Download App</div>
      </a>
      <a href="/" className="solutions">
        <div>Solutions</div>
        </a>
      <a href="/" className="Settings">
        <div>Settings</div>
      </a>
      <a href="/" className="about-us">
        <div>About Us</div>
      </a>
    </nav>
  )
}

export default NavBar