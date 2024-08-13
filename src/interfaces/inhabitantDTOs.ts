export enum CommunityName {
  DEFAULT = "",
  JACAREZEINHO = "Jacarezinho",
  QUEIMADAS = "Queimadas",
  QUIXABEIRA = "Quixabeira",
}

export interface IAddress {
  street: string;
  number: string;
  community: CommunityName;
}

export interface ICreateInhabitantDTO {
  name: string;
  cpf: string;
  address: IAddress;
  numberPhone?: string;
}

export interface IUpdateInhabitantDTO {
  name?: string;
  cpf?: string;
  address?: Partial<IAddress>;
  numberPhone?: string;
}

export interface IInhabitant {
  _id: string;
  name: string;
  cpf: string;
  numberPhone?: string;
  address: IAddress;
}
