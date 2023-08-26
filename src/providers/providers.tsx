"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../redux/dashboardstore/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()
    return (<Provider store={store}>
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </Provider>)
}
