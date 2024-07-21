'use client';
import React, {ReactNode, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import 'dayjs/locale/ru';
import 'dayjs/locale/kk';
import {StateContextProvider} from "@/contexts";
import {ConfigProvider} from "antd";

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
                <ConfigProvider
                    theme={{
                        token: {
                            fontFamily: 'Inter, sans-serif',
                            colorPrimary: '#FF6200',
                        },
                        components: {
                            Pagination: {
                                itemSize: 50
                            }
                        }
                    }}
                >
                {children}
            </ConfigProvider>
            </StateContextProvider>
        </QueryClientProvider>
    );
}

export default Providers;
