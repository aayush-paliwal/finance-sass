import { client } from "@/lib/hono";

import { useQuery } from "@tanstack/react-query";


export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await client.api.accounts.$get();

            // We can't use try/catch here because it's not axios, so we separately need to handle the error.
            if(!response.ok){
                throw new Error("Failed to fetch accounts");
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
}