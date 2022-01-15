import {ProductItemProps} from '~/services/queries/useFetchOrderStatus';
import ProductItem from './ProductItem'

export interface ProductListProps {
  data?: Array<ProductItemProps>;
}

const ProductList = ({
  data,
}: ProductListProps) => {
  if (!data) {
    return <div>NO DATA</div>;
  }
  return (
    <>
      {
        data.map((item: ProductItemProps, index: number) => {
          const {productName, variantName, quantity} = item || {};
          return (
            <ProductItem
              key={index}
              productName={productName}
              quantity={quantity}
              variantName={variantName}
            />
          )
        })
      }
    </>
  )
}

export default ProductList;