'use client'

import React from 'react'
import Button from './Button'
import NavBar from './NavBar'
import { signIn } from '../utils/databasefunctions'

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-[-25vh] w-full justify-center flex flex-col h-[100vh]">
        <h1 className="m-10 text-center font-bold text-6xl">It's time</h1>
        <p className="mx-20 text-center justify-center text-xl">All of your commitments, now in one place. Meet the beautifully designed, fully integrated calendar for your work and life.
        </p>
        <div className="mt-10 w-full flex justify-center item-center">
          <Button className="w-[100px] bd-red-500" onClick={signIn}> Sign Up </Button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage