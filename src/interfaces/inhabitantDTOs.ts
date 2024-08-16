export interface IAddress {
  street: string;
  number: string;
}

export interface ICreateInhabitantDTO {
  name: string;
  cpf: string;
  address: IAddress;
  numberPhone?: string;
  communityID: string;
}

export interface IUpdateInhabitantDTO {
  name?: string;
  cpf?: string;
  address?: Partial<IAddress>;
  numberPhone?: string;
  communityID: string;
}

export interface IInhabitant {
  _id: string;
  name: string;
  cpf: string;
  numberPhone?: string;
  address: IAddress;
  communityID: string;
}
