export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'orderId',
        title: 'Order ID',
        type: 'string',
      },
      {
        name: 'user',
        title: 'User',
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
        ],
      },
      {
        name: 'items',
        title: 'Ordered Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'productId', title: 'Product ID', type: 'string' },
              { name: 'name', title: 'Product Name', type: 'string' },
              { name: 'quantity', title: 'Quantity', type: 'number' },
              { name: 'price', title: 'Price', type: 'number' },
            ],
          },
        ],
      },
      {
        name: 'totalAmount',
        title: 'Total Amount',
        type: 'number',
      },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: {
          list: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        },
        initialValue: 'Pending',
      },
      {
        name: 'createdAt',
        title: 'Order Date',
        type: 'datetime',
        initialValue: new Date().toISOString(),
      },
    ],
  };
  