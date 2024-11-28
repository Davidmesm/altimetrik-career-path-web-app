import Image from 'next/image'
import React from 'react'
import Logo from "@/public/Altimetrik2.png";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex h-full w-full justify-center">
        <div className="flex w-full flex-col items-center gap-6 py-6">
            <div className="flex w-full items-center justify-center gap-2">
                <Image
                    src={Logo}
                    alt="Altimetrik Logo"
                    width={300}
                /> 
            </div>
            {children}
        </div>
    </main>
  )
}

export default AuthLayout