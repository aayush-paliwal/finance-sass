import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await client.api.accounts.$get();
            console.log("GET accounts: ", response);

            // We can't use try/catch here because it's not axios, so we separately need to handle the error.
            if(!response.ok){
                throw new Error("Failed to fetch accounts");
            }

            const { data } = await response.json();
            console.log("Accounts data: ", data)
            return data;
        }
    });

    return query;
}