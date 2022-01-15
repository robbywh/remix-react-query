import ProductList from '~/components/Product/ProductList';
import Button, {Type} from '~/components/Button';
import {OrderDataProps} from '~/services/queries/useFetchOrderStatus';

const OrderItem = ({
  items,
  customerName,
  randomDigit,
  onClick,
}: OrderDataProps) => {

  return (
    <div className="mb-2 p-5 w-full rounded border-2 bg-white">
      <div className="font-bold text-lg">#{randomDigit} - {customerName}</div>
      <ProductList data={items} />
      <br />
      <Button title="Accept" configs={{type: Type.SECONDARY}} onClick={() => onClick && onClick()} />
    </div>
  )
}

export default OrderItem;