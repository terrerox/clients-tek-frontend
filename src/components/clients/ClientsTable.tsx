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
import { Client } from '../../types';

interface Props {
  clients: Client[],
  setClient: React.Dispatch<React.SetStateAction<Client | null>>
  onOpen: () => void,
  deleteClient: (id: string) => void
}
export const ClientsTable = ({ clients, setClient, deleteClient, onOpen }: Props) => {

  const updateClient = (client: Client) => {
    onOpen()
    setClient(client)
  }
  return (
    <Table variant='striped' colorScheme='teal'>
    <TableCaption id="logger"> 
        Updated 2 minutes ago
    </TableCaption>
    <Thead>
        <Tr>
            <Th>Document</Th>
            <Th>Name</Th>
            <Th>LastName</Th>
            <Th>Phone</Th>
            <Th>CellPhone</Th>
        </Tr>
    </Thead>
    <Tbody>
        {
            clients.map(client => (
                <Tr key={client.id}>
                    <Td>{client.document}</Td>
                    <Td>{client.name}</Td>
                    <Td>{client.lastName}</Td>
                    <Td>{client.phone}</Td>
                    <Td>{client.cellPhone}</Td>
                    <Td>
                        <Flex alignItems="center" justifyContent="space-around">
                            <Button
                                leftIcon={<FiPenTool />}
                                colorScheme='blue'
                                variant='solid'
                                onClick={() => updateClient(client)}
                            >
                                Edit
                            </Button>
                            <Button
                                className='deleteButton'
                                leftIcon={<FiDelete />}
                                colorScheme='red'
                                variant='solid'
                                onClick={() => deleteClient(client.id)}
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
            <Th>Document</Th>
            <Th>Name</Th>
            <Th>LastName</Th>
            <Th>Phone</Th>
            <Th>CellPhone</Th>
        </Tr>
    </Tfoot>
</Table>
  )
}
