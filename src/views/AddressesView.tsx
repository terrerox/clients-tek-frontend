import { useState, useEffect } from 'react'
import { Link as ReachLink } from "react-router-dom";
import { 
  Text,
  Flex,
  Button,
  Spinner,
  useToast,
  Container,
  Link,
  useDisclosure
} from "@chakra-ui/react";
import { addressesService } from '../services/addressesService';
import { AddressesTable } from "../components/addresses/AddressesTable"
import { AddressModal } from "../components/addresses/AddressModal"
import { Address, CreateAddressInput, UpdateAddressInput } from "../types";

export const AddressesView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [address, setAddress] = useState<Address | null>(null)
  const toast = useToast()

  useEffect(() => {
    addressesService.findAll()
      .then(({ data: { addresses } }) => setAddresses(addresses))
  }, [])

  const deleteAddress = (id: string): void => {
    addressesService.remove(id)
        .then(() => {
          setAddresses(addresses => addresses.filter(address => address.id !== id))
            toast({
                title: "Deleted",
                description: "Address deleted successfully",
                status: "success",
                duration: 90000000,
                isClosable: true,
            })
        })
  }

  const updateAddress = (updatedAddress: UpdateAddressInput): void => {
    addressesService.update(updatedAddress)
        .then(res => {
            if(res.errors) {
              return toast({
                title: 'Error',
                description: res.errors[0].message,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            }
            setAddresses(addresses => { 
              const allButUpdatedAddress = addresses.filter(address => address.id !== updatedAddress?.id)
              return [res.data.address, ...allButUpdatedAddress]
            })
            toast({
                title: "Updated",
                description: "Address updated successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        })
  }

  const createAddress = (newAddress: CreateAddressInput): void => {
    addressesService.create(newAddress)
        .then(res => {
            if(res.errors) {
              return toast({
                title: 'Error',
                description: res.errors[0].message,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            }
            setAddresses(addresses => [res.data.address, ...addresses])
            toast({
                title: "Added",
                description: "Address added successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        })
  }

  const openModal = (): void => {
    setAddress(null)
    onOpen()
  }
  return (
    <>
    <Container maxW='90%'>
      <Flex alignItems="center" justifyContent="space-between">
          <Button colorScheme='teal' id="newButton" variant='outline' onClick={openModal}>
              New
          </Button>
          <Text my="2" fontSize="2xl" id="title" fontFamily="monospace" fontWeight="bold">
              Addresses
          </Text>
          <Link as={ReachLink} fontSize="lg" ml="2px" color='teal' to="/">
              Go to Clients⏩ 
          </Link>
      </Flex>
      <AddressModal
          address={address}
          createAddress={createAddress}
          updateAddress={updateAddress}
          isOpen={isOpen}
          onClose={onClose}
      />
      {
        !addresses && <Spinner /> 
      }
      {
        addresses && (
          <AddressesTable 
            addresses={addresses}
            setAddress={setAddress}
            deleteAddress={deleteAddress}
            onOpen={onOpen}
          />
        )
      }
    </Container>
    </>
  )
}
