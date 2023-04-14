import React, { useState, useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast
} from '@chakra-ui/react'
import { AddressForm } from './AddressForm'
import { useForm } from '../../hooks/useForm'
import { Address, CreateAddressInput, UpdateAddressInput } from '../../types'


interface Props {
  address: Address | null
  isOpen: boolean
  createAddress: (newAddress: CreateAddressInput) => void
  updateAddress: (updatedAddress: UpdateAddressInput) => void
  onClose: () => void
}

export const AddressModal = ({ address, createAddress, updateAddress, isOpen, onClose }: Props) => {
  const toast = useToast()
    
  const {values, handleInputChange, setValues} = useForm<CreateAddressInput>({
    street: '', 
    street2: '', 
    city: '', 
    zipCode: 0, 
    clientId: ''
  })

  useEffect(() => {
      setValues({
        street: address?.street || '', 
        street2: address?.street2 || '', 
        city: address?.city || '', 
        zipCode: address?.zipCode || 0, 
        clientId: address?.clientId || ''
      })
  }, [address])

  const { street, street2, city, zipCode, clientId } = values

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      if (street === "" || city === "" || zipCode === 0 || clientId === "") {
          return toast({
              title: "Error",
              description: "Please, complete all the inputs",
              status: "error",
              duration: 90000000,
              isClosable: true,
          })
      }
      const {zipCode: ZipCode, ...allValuesButZipCode} = values
      if (address?.id) {
          return updateAddress({id: address?.id,  zipCode: +ZipCode, ...allValuesButZipCode})
      } 

      createAddress({zipCode: +ZipCode, ...allValuesButZipCode})
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>
            { address?.id ? 'Update Address' : 'Create Address' }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <AddressForm
                formValues={values}
                handleInputChange={handleInputChange}
            />
        </ModalBody>

        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button
                onClick={handleSubmit}
                colorScheme='teal'
            >
                { address?.id ? 'Update Address' : 'Create Address' }
            </Button>
        </ModalFooter>
    </ModalContent>
</Modal>
  )
}
