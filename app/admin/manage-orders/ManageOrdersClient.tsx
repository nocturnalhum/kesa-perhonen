'use client';

import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import ActionBtn from '@/app/components/ActionBtn';
import Heading from '@/app/components/Heading';
import { Order, User } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from '@/utils/formatPrice';
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
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
      headerName: 'Amount (CAD)',
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
        let icon;
        switch (params.row.payStatus) {
          case 'pending':
            status = 'Pending';
            text = 'text-red-400';
            icon = <MdAccessTimeFilled size={18} />;
            break;
          case 'complete':
            status = 'Completed';
            text = 'text-emerald-400';
            icon = <MdDone size={18} />;
            break;
          default:
            status = params.row.payStatus;
        }
        return (
          <div
            className={`flex items-center capitalize ${text} font-semibold tracking-wide bg-slate-100 px-2 py-1 rounded`}
          >
            {status}
            {icon}
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
        let icon;
        switch (params.row.deliveryStatus) {
          case 'pending':
            status = 'Pending';
            text = 'text-red-400';
            icon = <MdAccessTimeFilled size={18} />;
            break;
          case 'dispatched':
            status = 'Dispatched';
            text = 'text-blue-400';
            icon = <MdDeliveryDining size={18} />;
            break;
          case 'delivered':
            status = 'Delivered';
            text = 'text-emerald-400';
            icon = <MdDone size={18} />;
            break;
          default:
            status = params.row.deliveryStatus;
        }
        return (
          <div
            className={`flex items-center gap-0.5 capitalize ${text} font-semibold tracking-wide bg-slate-100 px-2 py-1 rounded`}
          >
            {status}
            {icon}
          </div>
        );
      },
    },

    {
      field: 'action',
      headerName: 'Actions',
      headerAlign: 'center',
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
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  // ============================================================================
  // =====<<< Handle Dispatch Order >>>==========================================
  // ============================================================================
  const handleDispatch = (id: string) => {
    console.log('ID', id);
    axios
      .put('/api/order', {
        id,
        deliveryStatus: 'dispatched',
      })
      .then((res) => {
        toast.success('Order Dispatched', {
          id: 'dispatchSuccess',
        });
        router.refresh();
      })
      .catch((error: any) => {
        toast.error('Oops! Order not dispatched', {
          id: 'dispatchError',
        });
        console.log('Error: ', error);
      });
  };

  // ============================================================================
  // =====<<< Handle Deliver Order >>>===========================================
  // ============================================================================
  const handleDeliver = (id: string) => {
    console.log('ID', id);
    axios
      .put('/api/order', {
        id,
        deliveryStatus: 'delivered',
      })
      .then((res) => {
        toast.success('Order Delivered', {
          id: 'deliverSuccess',
        });
        router.refresh();
      })
      .catch((error: any) => {
        toast.error('Oops! Order not delivered', {
          id: 'deliverError',
        });
        console.log('Error: ', error);
      });
  };

  return (
    <div className='max-w-[1200px] mx-auto text-xl mb-4'>
      <div className='mt-8 mb-4'>
        <Heading title='Manage Orders' center />
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

export default ManageOrdersClient;
