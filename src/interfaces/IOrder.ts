export interface IOrder {
  _id: string;
  content: string;
  userID: string;
  inhabitantID: string;
  status: string;
  date: string;
  date_update: string;
}

export interface IOrderWithCommunity {
  community: string;
  date: string;
}
