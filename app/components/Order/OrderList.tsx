import OrderItem from './OrderItem';
import {OrderDataProps} from '~/services/queries/useFetchOrderStatus';

export interface OrderListProps {
  data?: Array<OrderDataProps>;
  title?: string;
  onClick?: (index: number) => void;
}

const OrderList = ({
  title,
  data,
  onClick
}: OrderListProps) => {
  if (!data) {
    return <div>NO DATA</div>;
  }
  return (
    <div className="p-5 bg-gray-300 border-width-2">
      <div className="font-bold text-lg mb-2">{title}</div>
      {
        data.map((item: OrderDataProps, index: number) => {
          const {customerName, randomDigit, items} = item || {};
          return (
            <OrderItem
              key={item.id}
              items={items}
              customerName={customerName}
              randomDigit={randomDigit}
              onClick={() => onClick && onClick(index)}
            />
          )
        })
      }
    </div>
  )
}

export default OrderList;