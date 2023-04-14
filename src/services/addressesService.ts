import { graphQLFetch } from "../helpers";
import { Address, CreateAddressInput, GraphQlResponse, UpdateAddressInput } from "../types";

export const addressesService = {
    async create(createAddressInput: CreateAddressInput): Promise<GraphQlResponse<{ address: Address }>> {
        const query = `
        mutation CreateAddress($createAddressInput: CreateAddressInput!) {
          address: createAddress(createAddressInput: $createAddressInput) {
              id
              street
              street2
              city
              zipCode
              clientId
              client {
                name
                lastName
              }
            }
          }
        `
        const variables = { createAddressInput }
        const newAddress = await graphQLFetch<{ address: Address }>(
            query,
            variables,
        )
        return newAddress;
    },

    async findAll(): Promise<GraphQlResponse<{ addresses: Address[] }>> {
      const query = `
      {
        addresses {
            id
            street
            street2
            city
            zipCode
            clientId
            client {
              name
              lastName
            }
        }
      }
      `
      const addresses = await graphQLFetch<{ addresses: Address[] }>(
          query
      )
      return addresses;
    },

    async findOne(id: string): Promise<GraphQlResponse<{ address: Address }>> {
      const query =  `
      query Address($addressId: ID!) {
          address(id: $addressId) {
            id
            street
            street2
            city
            zipCode
            clientId
          }
        }
      `
      const variables = { AddressId: id }
      const Address = await graphQLFetch<{ address: Address }>(
          query,
          variables,
      )
      return Address;
    },

    async update(updateAddressInput: UpdateAddressInput,): Promise<GraphQlResponse<{ address: Address }>> {
      const query =  `
      mutation UpdateAddress($updateAddressInput: UpdateAddressInput!) {
        address: updateAddress(updateAddressInput: $updateAddressInput) {
            id
            street
            street2
            city
            zipCode
            clientId
            client {
              name
              lastName
            }
          }
        }
      `
      const variables = { updateAddressInput }
      const updatedAddress = await graphQLFetch<{ address: Address }>(
          query,
          variables,
      )
      return updatedAddress;
    },

    async remove(id: string): Promise<GraphQlResponse<{ address: Address }>> {
      const query =  `
      mutation RemoveAddress($removeAddressId: ID!) {
        address: removeAddress(id: $removeAddressId) {
            id
          }
        }
      `
      const variables = { removeAddressId: id }
      const deletedAddress = await graphQLFetch<{ address: Address }>(
          query,
          variables
      )
      return deletedAddress;
    }
}