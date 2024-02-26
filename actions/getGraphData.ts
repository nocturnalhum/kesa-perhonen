import prisma from '@/libs/prismadb';
import moment from 'moment';

export default async function getGraphData() {
  try {
    // Get Start and End dates for data range:
    const startDate = moment().subtract(6, 'days').startOf('day');
    const endDate = moment().endOf('day');

    // Query database to get order data grouped by createdDate:
    const result = await prisma.order.groupBy({
      by: ['createDate'],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: 'complete',
      },
      _sum: {
        amount: true,
      },
    });

    // Initialize object to aggregate data by day:
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    // Create clone of start date to iterate over each day:
    const currentDate = startDate.clone();

    // Iterate over days in date range:
    while (currentDate <= endDate) {
      // Format day as string (e.g. "Monday")
      const day = currentDate.format('dddd');

      aggregatedData[day] = {
        day,
        date: currentDate.format('YYYY-MM-DD'),
        totalAmount: 0,
      };

      // Increment to next day:
      currentDate.add(1, 'day');
    }

    // Calculate total amount for each day:
    result.forEach((entry: any) => {
      const day = moment(entry.createDate).format('dddd');
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    // Convert aggregatedData object to array and sort it by date:
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
