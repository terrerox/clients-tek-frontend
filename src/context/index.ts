import { createContext } from "react";
import { Client } from "../types";

export const AppContext = createContext<{ clients: Client[], setClients: React.Dispatch<any>}>(null)
