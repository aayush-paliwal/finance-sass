import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,         // This query is only going to be fetched if we actually have the id.
        queryKey: ["category", { id }],
        queryFn: async () => {
            const response = await client.api.categories[":id"].$get({
                param: { id },
            });

            // We can't use try/catch here because it's not axios, so we separately need to handle the error.
            if(!response.ok){
                throw new Error("Failed to fetch category");
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
};