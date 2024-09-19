"use client"
import React, {useState} from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import StoreStateContextProvider from './lib/context/storeContext';
import { SessionProvider } from 'next-auth/react';
//import { Elements } from '@stripe/react-stripe-js';
//import { loadStripe } from '@stripe/stripe-js';

const Provider=({children}:any)=>{
    const [client]=useState(new QueryClient());
    
    
    return(
        <>
        
        <StoreStateContextProvider>
            <QueryClientProvider client={client} >
                <ReactQueryStreamedHydration>
                    <SessionProvider>
                    {children}
                    </SessionProvider>
                </ReactQueryStreamedHydration>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StoreStateContextProvider>
       
        </>
    )
}

export {Provider}