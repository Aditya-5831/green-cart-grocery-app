import { useAppContext } from "../context/AppContext"
import type { Product } from "../lib/types";
import ProductCard from "./ProductCard"

const BestSeller = () => {
    const { products } =  useAppContext();

  return (
    <div className="mt-16">
        <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6 lg:grid-cols-5 mt-6">
           {products.filter(product => product.inStock).slice(0, 5).map((product: Product) => <ProductCard key={product._id} product={product}/>)}
        </div>
    </div>
  )
}

export default BestSeller