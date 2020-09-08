import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Sushi } from '../../sushi'

export interface BastaContext {
  sushi?: typeof Sushi
}

export const Context = createContext<BastaContext>({
  sushi: undefined,
})

declare global {
  interface Window {
    sushisauce: any
  }
}

const BastaProvider: React.FC = ({ children }) => {
  const { ethereum } = useWallet()
  const [sushi, setSushi] = useState<any>()

  useEffect(() => {
    if (ethereum) {
      const sushiLib = new Sushi(
        ethereum,
        "1",
        false, {
          defaultAccount: "",
          defaultConfirmations: 1,
          autoGasMultiplier: 1.5,
          testing: false,
          defaultGas: "6000000",
          defaultGasPrice: "1000000000000",
          accounts: [],
          ethereumNodeTimeout: 10000
        }
      )
      setSushi(sushiLib)
      window.sushisauce = sushiLib
    }
  }, [ethereum])

  return (
    <Context.Provider value={{ sushi }}>
      {children}
    </Context.Provider>
  )
}

export default BastaProvider
