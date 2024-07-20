import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,        
        queryKey: ["transaction", { id }],
        queryFn: async () => {
            const response = await client.api.transactions[":id"].$get({
                param: { id },
            });

            // We can't use try/catch here because it's not axios, so we separately need to handle the error.
            if(!response.ok){
                throw new Error("Failed to fetch transaction");
            }

            const { data } = await response.json();
            return {
                ...data,
                amount: convertAmountFromMiliunits(data.amount),
            };
        }
    });

    return query;
}