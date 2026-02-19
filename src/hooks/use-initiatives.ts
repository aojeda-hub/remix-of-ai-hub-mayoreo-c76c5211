import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useInitiatives() {
    return useQuery({
        queryKey: ["initiatives"],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("initiatives")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });
}

export function useInitiative(id: string) {
    return useQuery({
        queryKey: ["initiative", id],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("initiatives")
                .select("*")
                .eq("id", id)
                .maybeSingle();
            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });
}

export function useCreateInitiative() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newInitiative: any) => {
            const { data, error } = await (supabase as any)
                .from("initiatives")
                .insert(newInitiative)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["initiatives"] });
            toast.success("Iniciativa creada correctamente");
        },
        onError: (error: any) => {
            toast.error("Error al crear la iniciativa: " + error.message);
        },
    });
}

export function useUpdateInitiative() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }: any) => {
            const { data, error } = await (supabase as any)
                .from("initiatives")
                .update(updates)
                .eq("id", id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["initiatives"] });
            queryClient.invalidateQueries({ queryKey: ["initiative", data.id] });
            toast.success("Iniciativa actualizada correctamente");
        },
        onError: (error: any) => {
            toast.error("Error al actualizar la iniciativa: " + error.message);
        },
    });
}

export function useFavorites(userId: string | undefined) {
    return useQuery({
        queryKey: ["favorites", userId],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("favorites")
                .select("initiative_id")
                .eq("user_id", userId!);
            if (error) throw error;
            return data.map((f: any) => f.initiative_id);
        },
        enabled: !!userId,
    });
}

export function useToggleFavorite(userId: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ initiativeId, isFavorite }: { initiativeId: string; isFavorite: boolean }) => {
            if (isFavorite) {
                const { error } = await (supabase as any)
                    .from("favorites")
                    .delete()
                    .eq("user_id", userId!)
                    .eq("initiative_id", initiativeId);
                if (error) throw error;
            } else {
                const { error } = await (supabase as any)
                    .from("favorites")
                    .insert({ user_id: userId!, initiative_id: initiativeId });
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
        },
        onError: (error: any) => {
            toast.error("Error al actualizar favoritos: " + error.message);
        },
    });
}
