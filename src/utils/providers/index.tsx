'use client';
import React, {ReactNode, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import 'dayjs/locale/ru';
import 'dayjs/locale/kk';
import {StateContextProvider} from "@/contexts";

function Providers({children}: { children: ReactNode }) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        }),
    );

    return (
        <QueryClientProvider client={client}>
            <StateContextProvider>
                {children}
            </StateContextProvider>
        </QueryClientProvider>
    );
}

export default Providers;
