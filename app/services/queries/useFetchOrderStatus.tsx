import {useQuery} from 'react-query';

export enum Status {
  TO_DO = "ToDo",
  IN_PROGRESS = "InProgress",
  DONE = "Done",
}

export interface ProductItemProps {
  productName: string;
  quantity: number;
  variantName: string;
  variantNameLocale?: string;
  decimalTotal?: number;
}

export interface OrderDataProps {
  id?: string;
  randomDigit: number;
  customerName: string;
  items: Array<ProductItemProps>;
  status?: string;
  pickupTime?: string;
  statusOrder?: string;
  onClick?: () => void;
}

interface Options {
  initialData?: Array<OrderDataProps>;
  enabled: boolean;
}

export const fetchOrderStatus = async (status: Status): Promise<Array<OrderDataProps>> => {
  const response = await fetch(
    `http://localhost:3001/order?statusOrder=${status}`
  );

  return response.json();
};

const useFetchOrderStatus = (status: Status, options: Options) => {
  return useQuery(
    [status],
    async () => {
      const response = await fetchOrderStatus(status);
      if (!response) {
        throw new Error('fetchOrderStatus failed');
      }
      return response;
    },
    options
  );
};

export default useFetchOrderStatus;
