export interface Client {
    id: string
    document: string, 
    name: string, 
    lastName: string, 
    phone: string, 
    cellPhone?: string, 
    addresses?: Address[]
}
export interface CreateClientInput {
    document: string;
    name: string;
    lastName: string;
    phone: string;
    cellPhone?: string;
}

export interface UpdateClientInput {
    id: string;
    document: string;
    name: string;
    lastName: string;
    phone: string;
    cellPhone?: string;
}

export type GraphQlData = { [key: string]: any, [index: number]: never };

export interface GraphQlResponse<T extends GraphQlData> {
    data: T;
    errors?: Array<{ message: string }>;
}

export interface Address {
    id: string
    street: string, 
    street2?: string, 
    city: string, 
    zipCode: number, 
    client: Client,
    clientId: string
}

interface CreateAddressInput {
    street: string;
    street2?: string;
    city: string;
    zipCode: number;
    clientId: string;
}

interface UpdateAddressInput {
    id: string;
    street: string;
    street2?: string;
    city: string;
    zipCode: number;
    clientId: string;
}
  