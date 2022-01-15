import * as React from 'react';
import {ProductItemProps} from '~/services/queries/useFetchOrderStatus';

const ProductItem = ({
  productName,
  quantity,
  variantName
}: ProductItemProps) => {

  return (
    <div className="mb-2 p-5 w-full rounded bg-gray-300">
        <div className="flex flex-row">
          <div className="mr-2 mb-2 flex-none text-red-flash-coffee text-base">
            {quantity}X 
          </div>
          <div className="flex-1 text-black text-base font-bold">
            {productName}
          </div>
        </div>
        {variantName && <div className="text-gray-700">{variantName}</div>}
    </div>
  )
}

export default React.memo(ProductItem)