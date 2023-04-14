import { useState, useEffect, useContext } from 'react'
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
import { clientsService } from '../services/clientsService';
import { ClientsTable } from "../components/clients/ClientsTable"
import { ClientModal } from "../components/clients/ClientModal"
import { Client, CreateClientInput, UpdateClientInput } from "../types";
import { AppContext } from '../context';

export const ClientsView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { clients, setClients } = useContext(AppContext);
  const [client, setClient] = useState<Client | null>(null)
  const toast = useToast()

  useEffect(() => {
    clientsService.findAll()
      .then(({ data: { clients } }) => setClients(clients))
  }, [])

  const deleteClient = (id: string): void => {
    clientsService.remove(id)
        .then(() => {
          setClients((clients: Client[]) => clients.filter(client => client.id !== id))
            toast({
                title: "Deleted",
                description: "Client deleted successfully",
                status: "success",
                duration: 90000000,
                isClosable: true,
            })
        })
  }

  const updateClient = (updatedClient: UpdateClientInput): void => {
    clientsService.update(updatedClient)
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
            setClients((clients: Client[]) => { 
              const allButUpdatedClient = clients.filter(client => client.id !== updatedClient?.id)
              return [res.data.client, ...allButUpdatedClient]
            })
            toast({
                title: "Updated",
                description: "Client updated successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        })
  }

  const createClient = (newClient: CreateClientInput): void => {
    clientsService.create(newClient)
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
            setClients((clients: Client[]) => [res.data.client, ...clients])
            toast({
                title: "Added",
                description: "Client added successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        })
  }

  const openModal = (): void => {
    setClient(null)
    onOpen()
  }
  return (
    <Container maxW='90%'>
      <Flex alignItems="center" justifyContent="space-between">
          <Button colorScheme='teal' id="newButton" variant='outline' onClick={openModal}>
              New
          </Button>
          <Text my="2" fontSize="2xl" id="title" fontFamily="monospace" fontWeight="bold">
              Clients             
          </Text>
          <Link as={ReachLink} fontSize="lg" ml="2px" color='teal' to="/addresses">
              Go to Addresses ⏩ 
          </Link>
      </Flex>
      <ClientModal
          client={client}
          createClient={createClient}
          updateClient={updateClient}
          isOpen={isOpen}
          onClose={onClose}
      />
      {
        !clients && <Spinner /> 
      }
      {
        clients && (
          <ClientsTable 
            clients={clients}
            setClient={setClient}
            deleteClient={deleteClient}
            onOpen={onOpen}
          />
        )
      }
    </Container>
  )
}
