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
import { ClientForm } from './ClientForm'
import { useForm } from '../../hooks/useForm'
import { Client, CreateClientInput, UpdateClientInput } from '../../types'

interface Props {
    client: Client | null
    isOpen: boolean
    createClient: (newClient: CreateClientInput) => void
    updateClient: (updatedClient: UpdateClientInput) => void
    onClose: () => void
}

export const ClientModal = ({ client, createClient, updateClient, isOpen, onClose }: Props) => {
    const toast = useToast()
    
    const {values, handleInputChange, setValues} = useForm<CreateClientInput>({
        document: '',
        name: '',
        lastName: '',
        phone: '',
        cellPhone: ''
    })

    useEffect(() => {
        setValues({
            document: client?.document || '',
            name: client?.name || '',
            lastName: client?.lastName || '',
            phone: client?.phone || '',
            cellPhone: client?.cellPhone || ''
        })
    }, [client])

    const { document, name, lastName, phone, cellPhone } = values

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (document === "" || name === "" || lastName === "" || phone === "" || cellPhone === "") {
            return toast({
                title: "Error",
                description: "Please, complete all the inputs",
                status: "error",
                duration: 90000000,
                isClosable: true,
            })
        }

        if (client?.id) {
            return updateClient({id: client?.id, ...values})
        } 

        createClient(values)
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>
            { client?.id ? 'Update client' : 'Create client' }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <ClientForm
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
                { client?.id ? 'Update client' : 'Create client' }
            </Button>
        </ModalFooter>
    </ModalContent>
</Modal>
  )
}
