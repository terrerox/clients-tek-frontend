import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

import { ClientsView } from '../views/ClientsView';
import { AddressesView } from '../views/AddressesView';
import { AppContext } from '../context';
import { Client } from '../types';

export const AppRouter = () => {
    const [clients, setClients] = useState<Client[]>([])
    return (
        <AppContext.Provider value={{ clients, setClients }}> 
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={ <ClientsView />  } />
                    <Route path="/addresses" element={ <AddressesView />  } />    
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}