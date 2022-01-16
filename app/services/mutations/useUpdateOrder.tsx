import {useMutation, useQueryClient} from 'react-query';
import {OrderDataProps, Status} from '~/services/queries/useFetchOrderStatus';

interface UpdateOrderProps {
  id: string;
  statusOrder: Status;
}
const updateOrder = async ({id, statusOrder}: UpdateOrderProps): Promise<Array<OrderDataProps>> => {
  console.log("PATCH", statusOrder)
  const response = await fetch(
    `http://localhost:3001/order/${id}`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',                                                              
      body: JSON.stringify( { statusOrder } )   
    }
  );

  return response.json();
};

const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder, {
    onMutate: async ({id, statusOrder}: UpdateOrderProps): Promise<{
      prevStatus: Status,
      currentStatus: Status,
      prevDataCurrent: Array<OrderDataProps>,
      prevDataBefore: Array<OrderDataProps>
    }> => {
      let prevStatus = Status.DONE;
      if (statusOrder === Status.IN_PROGRESS) {
        prevStatus = Status.TO_DO
      } else if (statusOrder === Status.DONE) {
        prevStatus = Status.IN_PROGRESS
      }
      const prevDataBefore = queryClient.getQueryData<Array<OrderDataProps>>(
        prevStatus,
      ) || [];
      const prevDataCurrent = queryClient.getQueryData<Array<OrderDataProps>>(
        statusOrder,
      ) || [];

      // if (prevDataBefore && prevDataCurrent) {
      //   const cloneDataBefore = [...prevDataBefore];
      //   const indexDataBefore = cloneDataBefore.findIndex(item => {
      //     return item.id === id;
      //   });
      //   const dataAccepted = cloneDataBefore.splice(indexDataBefore, 1);
      //   dataAccepted[0].statusOrder = statusOrder;
      //   const currentData = [...prevDataCurrent, ...dataAccepted]
      //   queryClient.setQueryData<Array<OrderDataProps>>(prevStatus, [
      //     ...cloneDataBefore,
      //   ]);
      //   queryClient.setQueryData<Array<OrderDataProps>>(statusOrder, [
      //     ...currentData,
      //   ]);
      // }

      return {
        prevStatus,
        prevDataBefore,
        currentStatus: statusOrder,
        prevDataCurrent,
      };
    },
    onError: (_err, _variables, context) => {
      if (context?.prevDataBefore) {
        queryClient.setQueryData<Array<OrderDataProps>>(
          context.prevStatus,
          context.prevDataBefore,
        );
      }

      if (context?.prevDataCurrent) {
        queryClient.setQueryData<Array<OrderDataProps>>(
          context.currentStatus,
          context.prevDataCurrent,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(Status.TO_DO);
      queryClient.invalidateQueries(Status.IN_PROGRESS);
      queryClient.invalidateQueries(Status.DONE);
    },
  });
};

export default useUpdateOrder;
