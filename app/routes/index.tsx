import {LoaderFunction, useLoaderData} from 'remix';
import OrderList from '~/components/Order/OrderList';
import useFetchOrderStatus, {Status, OrderDataProps} from '~/services/queries/useFetchOrderStatus';
import useUpdateOrder from '~/services/mutations/useUpdateOrder';
import {useQueryClient} from 'react-query';

export const loader: LoaderFunction = async ({params}) => {
  const fetchTodo = await fetch(
    `http://localhost:3001/order?statusOrder=${Status.TO_DO}`
  );
  const fetchInprogress = await fetch(
    `http://localhost:3001/order?statusOrder=${Status.IN_PROGRESS}`
  );
  const fetchDone = await fetch(
    `http://localhost:3001/order?statusOrder=${Status.DONE}`
  );
  const todo = await fetchTodo.json();
  const inprogress = await fetchInprogress.json();
  const done = await fetchDone.json();

  return {
    todo,
    inprogress,
    done,
  }
}

export default function Index() {
  const queryClient = useQueryClient()
  const orderStatusData = useLoaderData();
  const {data: dataTodo, refetch: refetchOrderTodo, isLoading: isLoadingTodo} = useFetchOrderStatus(Status.TO_DO, {
    initialData: orderStatusData.todo,
    enabled: false
  });
  const {data: dataInProgress, refetch: refetchOrderInProgress, isLoading: isLoadingInProgress} = useFetchOrderStatus(Status.IN_PROGRESS, {
    enabled: false,
    initialData: orderStatusData.inprogress
  });
  const {data: dataDone, refetch: refetchOrderDone, isLoading: isLoadingDone} = useFetchOrderStatus(Status.DONE, {
    enabled: false,
    initialData: orderStatusData.done
  });
  const {mutate} = useUpdateOrder();

  const onAccept = (data: OrderDataProps) => {
    let statusOrder = Status.DONE;
    if (data?.statusOrder === Status.TO_DO) {
      statusOrder = Status.IN_PROGRESS;
    } else if (data?.statusOrder === Status.IN_PROGRESS) {
      statusOrder = Status.DONE;
    } else {
      alert("DONE");
      return;
    }
    if (data?.id) {
      mutate({
        id: data?.id,
        statusOrder,
      });
    } else {
      alert("FAILED")
    }
  }

  return (
    <div className="flex flex-row justify-between bg-gray-300">
      <div className="flex-1">
        {dataTodo ? <OrderList title="TO DO" data={dataTodo} onClick={(index: number) => onAccept(dataTodo[index])} /> : "NOT FOUND"}
      </div>
      <div className="flex-1">
        {dataInProgress ? <OrderList title="IN PROGRESS" data={dataInProgress} onClick={(index: number) => onAccept(dataInProgress[index])} /> : "NOT FOUND"}
      </div>
      <div className="flex-1">
        {dataDone ? <OrderList title="DONE" data={dataDone} onClick={(index: number) => onAccept(dataDone[index])} /> : "NOT FOUND"}
      </div>
    </div>
  );
}
