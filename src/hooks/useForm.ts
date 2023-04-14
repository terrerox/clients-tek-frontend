import {useState} from 'react'

interface UseFormOutput<T> {
    values: T
    handleInputChange: ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    setValues: React.Dispatch<React.SetStateAction<T>>
}

export const useForm = <T>( initialState: T): UseFormOutput<T> => {
    const [values, setValues] = useState<T>(initialState)

    const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }

    return { values, handleInputChange, setValues }
}