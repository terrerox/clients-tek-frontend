import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    Text,
    SimpleGrid,
    Textarea,
    useToast
} from '@chakra-ui/react'
import { CreateClientInput } from '../../types'

interface Props {
    formValues: CreateClientInput,
    handleInputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
}
export const ClientForm = ({formValues, handleInputChange}: Props) => {
    const { document, name, lastName, phone, cellPhone } = formValues

    return (
        <form>
        <FormControl>
          <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
              <FormControl>
                  <FormLabel>Document</FormLabel>
                  <Input
                      isRequired
                      type="text" 
                      name="document" 
                      placeholder="document" 
                      value={document}
                      onChange={handleInputChange}
                  />
              </FormControl>
              <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                      isRequired
                      type="text" 
                      name="name" 
                      placeholder="name" 
                      value={name}
                      onChange={handleInputChange}
                  />
              </FormControl>
          </SimpleGrid>
          <FormLabel>LastName</FormLabel>
          <Input
                type="text" 
                name="lastName"
                placeholder='lastName'
                onChange={handleInputChange}
                value={lastName}
           />
          <FormLabel>Phone</FormLabel>
          <Input
                type="text" 
                name="phone"
                placeholder='Phone'
                onChange={handleInputChange}
                value={phone}
            />
           <FormLabel>Cell Phone</FormLabel>
           <Input
                type="text"
                value={cellPhone}
                name="cellPhone"
                onChange={handleInputChange}
                placeholder='Cell Phone'
            />
        </FormControl>
      </form>
    )
}
