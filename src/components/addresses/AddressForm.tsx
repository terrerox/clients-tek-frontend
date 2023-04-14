import React, { useContext } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
} from '@chakra-ui/react'
import { CreateAddressInput } from '../../types'
import { AppContext } from '../../context'

interface Props {
  formValues: CreateAddressInput,
  handleInputChange: ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const AddressForm = ({formValues, handleInputChange}: Props) => {

  const { street, street2, city, zipCode, clientId } = formValues
  const { clients } = useContext(AppContext);


  return (
    <form>
    <FormControl>
      <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
          <FormControl>
              <FormLabel>Street Address</FormLabel>
              <Input
                  isRequired
                  type="text" 
                  name="street" 
                  placeholder="street" 
                  value={street}
                  onChange={handleInputChange}
              />
          </FormControl>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input
              type="text" 
              name="city"
              placeholder='city'
              onChange={handleInputChange}
              value={city}
            />
      </FormControl>
      </SimpleGrid>
      <FormLabel>Apt, Suite, Building (Optional)</FormLabel>
      <Input
          isRequired
          type="text" 
          name="street2" 
          placeholder="Apt, Suite, Building" 
          value={street2}
          onChange={handleInputChange}
      />
      <FormLabel>ZipCode</FormLabel>
      <Input
            type="number" 
            name="zipCode"
            placeholder='ZipCode'
            onChange={handleInputChange}
            value={zipCode}
        />
       <FormLabel>Client</FormLabel>
       <Select 
          placeholder='Select option'
          onChange={handleInputChange}
          name="clientId"
          value={clientId}
        >
          {
            clients.map(client => (
              <option 
                key={client.id} 
                value={client.id}
              >
                {client.name} {client.lastName}
              </option>
            ))
          }
       </Select>
    </FormControl>
  </form>
  )
}
