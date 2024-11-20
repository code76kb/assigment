
export interface ZellerCustomer {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ZellerCustomerConnection {
  items: ZellerCustomer[];
  nextToken?: string;
}

export interface TableStringFilterInput {
  eq?: string;
  ne?: string;
  contains?: string;
  notContains?: string;
  beginsWith?: string;
}

export interface ListZellerCustomersVariables {
  filter?: {
    name?: TableStringFilterInput;
    role?: TableStringFilterInput;
  };
  limit?: number;
  nextToken?: string;
}

export interface GetZellerCustomerVariables {
  id: string;
}
