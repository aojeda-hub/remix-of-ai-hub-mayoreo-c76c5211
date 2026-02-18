import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useLibraryResources() {
    return useQuery({
        queryKey: ["library-resources"],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("library_resources")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });
}
