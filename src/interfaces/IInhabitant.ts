export enum CommunityName {
  JACAREZEINHO = "Jacarezeinho",
  QUEIMADAS = "Queimadas",
  QUIXABEIRA = "Quixabeira",
}

export interface IAddress {
  street: string;
  number: string;
  community: string;
}

export interface IInhabitant {
  _id: string;
  name: string;
  cpf: string;
  numberPhone: string;
  address: IAddress;
}

export interface IInhabitantUpdate {
  name: string;
  cpf: string;
  numberPhone: string;
  address: IAddress;
}
