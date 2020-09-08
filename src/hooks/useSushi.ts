import { useContext } from 'react'
import { Context } from '../contexts/BastaProvider'

const useSushi = () => {
  const { sushi } = useContext(Context)
  return sushi
}

export default useSushi