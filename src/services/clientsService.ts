import { graphQLFetch } from "../helpers";
import { Client, CreateClientInput, GraphQlResponse, UpdateClientInput } from "../types";

export const clientsService = {
    async create(createClientInput: CreateClientInput): Promise<GraphQlResponse<{ client: Client }>> {
        const query = `
        mutation CreateClient($createClientInput: CreateClientInput!) {
            client: createClient(createClientInput: $createClientInput) {
              id
              document
              name
              lastName
              phone
              cellPhone
            }
          }`
        const variables = { createClientInput }
        const newClient = await graphQLFetch<{ client: Client }>(
            query,
            variables,
        )
        return newClient;
    },

    async findAll(): Promise<GraphQlResponse<{ clients: Client[] }>> {
        const query = `
        {
            clients {
                id
                document
                name
                lastName
                phone
                cellPhone
            }
        }
        `
        const clients = await graphQLFetch<{ clients: Client[] }>(query)
        return clients;
    },

    async findOne(id: string): Promise<GraphQlResponse<{ client: Client }>> {
        const query = `
            query Client($clientId: ID!) {
                client(id: $clientId) {
                    id
                    document
                    name
                    lastName
                    phone
                    cellPhone
                }
            }
        `
        const variables = { clientId: id }
        const client = await graphQLFetch<{ client: Client }>(
            query,
            variables
        )
        return client;
    },

    async update(updateClientInput: UpdateClientInput): Promise<GraphQlResponse<{ client: Client }>> {
        const query = `
        mutation UpdateClient($updateClientInput: UpdateClientInput!) {
            client: updateClient(updateClientInput: $updateClientInput) {
              id
              document
              name
              lastName
              phone
              cellPhone
            }
          }
        `
        const variables = { updateClientInput }
        const updatedClient = await graphQLFetch<{ client: Client }>(
            query,
            variables
        )
        return updatedClient;
    },

    async remove(id: string): Promise<GraphQlResponse<{ client: Client }>> {
        const query = `
        mutation RemoveClient($removeClientId: ID!) {
            removeClient(id: $removeClientId) {
              id
              document
              name
              lastName
              phone
              cellPhone
            }
          }`
        const variables = { removeClientId: id }
        const deletedClient = await graphQLFetch<{ client: Client }>(
            query,
            variables
        )
        return deletedClient;
    }
}