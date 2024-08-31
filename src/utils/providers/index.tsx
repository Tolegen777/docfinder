'use client';
import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'dayjs/locale/ru';
import 'dayjs/locale/kk';
import { StateContextProvider } from "@/contexts";
import { ConfigProvider } from "antd";

function Providers({ children }: { children: ReactNode }) {
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
                            fontFamily: 'Lato, sans-serif',
                            colorPrimary: '#FF6200',
                        },
                        components: {
                            Pagination: {
                                itemSize: 50,
                            },
                            Table: {
                                headerBg: '#FF6200',
                                headerColor: '#FFFFFF',
                                colorBgContainer: '#EFEFEF',
                            },
                            Descriptions: {
                                labelBg: '#FF6200',
                                titleColor: '#FF6200',
                            },
                            Carousel: {
                                dotHeight: 12,
                                arrowSize: 24,
                                dotWidth: 20,
                                dotActiveWidth: 40,
                            },
                        },
                    }}
                >
                    {children}
                </ConfigProvider>
            </StateContextProvider>
        </QueryClientProvider>
    );
}

export default Providers;
