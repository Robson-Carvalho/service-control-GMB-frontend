export enum OrderStatusRole {
  PENDING = "Pendente",
  REJECTED = "Negado",
  ATTENDED = "Atendido",
}

export interface IOrder {
  _id: string;
  content: string;
  userID: string;
  inhabitantID: string;
  status: OrderStatusRole;
  date: string;
  date_update: string;
}

export interface IOrderWithCommunity {
  community: string;
  date: string;
}

export interface ICreateOrderDTO {
  content: string;
  inhabitantCPF: string;
  userID: string;
}

export interface IUpdateOrderDTO {
  content?: string;
  status: OrderStatusRole;
}

export interface IOrderDataTable {
  _id: string;
  userType: string;
  userName: string;
  inhabitantName: string;
  inhabitantCPF: string;
  content: string;
  status: "Pendente" | "Negado" | "Atendido";
  date: string;
  date_update: string;
}
