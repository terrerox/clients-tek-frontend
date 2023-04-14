import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Flex
} from '@chakra-ui/react'
import {
  FiPenTool,
  FiDelete
} from "react-icons/fi";
import { Address } from '../../types';

interface Props {
  addresses: Address[],
  setAddress: React.Dispatch<React.SetStateAction<Address | null>>
  onOpen: () => void,
  deleteAddress: (id: string) => void
}
export const AddressesTable = ({ addresses, setAddress, deleteAddress, onOpen }: Props) => {
  const updateAddress = (address: Address) => {
    onOpen()
    setAddress(address)
  }
  return (
    <Table variant='striped' colorScheme='teal'>
    <TableCaption id="logger"> 
        Updated 2 minutes ago
    </TableCaption>
    <Thead>
        <Tr>
            <Th>Street Address</Th>
            <Th>Apt, Suite, Building</Th>
            <Th>City</Th>
            <Th>ZipCode</Th>
            <Th>Client</Th>
        </Tr>
    </Thead>
    <Tbody>
        {
            addresses.map(address => (
                <Tr key={address.id}>
                    <Td>{address.street}</Td>
                    <Td>{address.street2}</Td>
                    <Td>{address.city}</Td>
                    <Td>{address.zipCode}</Td>
                    <Td>{address.client.name} {address.client.lastName}</Td>
                    <Td>
                        <Flex alignItems="center" justifyContent="space-around">
                            <Button
                                leftIcon={<FiPenTool />}
                                colorScheme='blue'
                                variant='solid'
                                onClick={() => updateAddress(address)}
                            >
                                Edit
                            </Button>
                            <Button
                                className='deleteButton'
                                leftIcon={<FiDelete />}
                                colorScheme='red'
                                variant='solid'
                                onClick={() => deleteAddress(address.id)}
                            >
                                Delete
                            </Button>
                        </Flex>
                    </Td>
                </Tr>
            ))
        }
    </Tbody>
    <Tfoot>
        <Tr>
            <Th>Street Address</Th>
            <Th>Apt, Suite, Building</Th>
            <Th>City</Th>
            <Th>ZipCode</Th>
            <Th>Client</Th>
        </Tr>
    </Tfoot>
</Table>
  )
}
