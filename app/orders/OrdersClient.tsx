'use client';

import moment from 'moment';
import Heading from '../components/Heading';
import ActionBtn from '../components/ActionBtn';
import { Order, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { MdRemoveRedEye } from 'react-icons/md';
import { formatPrice } from '@/utils/formatPrice';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        payStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'date',
      headerName: 'Date',
      width: 130,
    },
    { field: 'customer', headerName: 'Customer Name', width: 130 },
    {
      field: 'amount',
      headerName: 'Amount(CAD)',
      headerAlign: 'center',
      align: 'center',
      width: 120,
      renderCell: (params) => {
        return (
          <div className='font-bold text-slate-800'>{params.row.amount}</div>
        );
      },
    },
    {
      field: 'payStatus',
      headerName: 'Payment Status',
      headerAlign: 'center',
      align: 'center',
      width: 130,
      renderCell: (params) => {
        let status;
        let text;
        switch (params.row.payStatus) {
          case 'pending':
            status = 'Pending';
            text = 'text-red-400';
            break;
          case 'complete':
            status = 'Completed';
            text = 'text-emerald-400';
            break;
          default:
            status = params.row.payStatus;
        }
        return (
          <div className={`capitalize ${text} font-medium tracking-wide `}>
            {status}
          </div>
        );
      },
    },
    {
      field: 'deliveryStatus',
      headerName: 'Delivery Status',
      headerAlign: 'center',
      align: 'center',
      width: 130,
      renderCell: (params) => {
        let status;
        let text;
        switch (params.row.deliveryStatus) {
          case 'pending':
            status = 'Pending';
            text = 'text-red-400';
            break;
          case 'dispatched':
            status = 'Dispatched';
            text = 'text-blue-400';
            break;
          case 'delivered':
            status = 'Delivered';
            text = 'text-emerald-400';
            break;
          default:
            status = params.row.deliveryStatus;
        }
        return (
          <div className={`capitalize ${text} font-medium tracking-wide `}>
            {status}
          </div>
        );
      },
    },

    {
      field: 'action',
      headerName: 'Actions',
      align: 'center',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='flex justify-between gap-4 w-full'>
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className='max-w-[1150px] mx-auto text-xl mb-4'>
      <div className='mt-8 mb-4'>
        <Heading title='Orders' center />
      </div>
      <div style={{ height: 632, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;
