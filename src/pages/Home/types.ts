export interface Order {
  feed: 'book';
  product_id: string;
  side: 'buy' | 'sell';
  seq: number;
  price: number;
  qty: number;
  timestamp: Date;
}

export interface HomeScreenPropsType {
  navigation: {
    navigate: () => void;
  };
  ordersSubscribe: () => void;
  ordersUnsubscribe: () => void;
  orders: object;
  error: boolean | Object;
  status: boolean;
}
