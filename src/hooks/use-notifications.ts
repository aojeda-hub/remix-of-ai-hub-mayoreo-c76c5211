import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useNotifications(userEmail: string | undefined) {
    return useQuery({
        queryKey: ["notifications", userEmail],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("notifications")
                .select("*")
                .eq("user_email", userEmail!)
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
        enabled: !!userEmail,
    });
}

export function useMarkNotificationRead() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await (supabase as any)
                .from("notifications")
                .update({ read: true })
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error: any) => {
            toast.error("Error al marcar notificación: " + error.message);
        },
    });
}

export function useCreateNotification() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (notification: any) => {
            const { data, error } = await (supabase as any)
                .from("notifications")
                .insert(notification)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["notifications", data.user_email] });
        },
        onError: (error: any) => {
            console.error("Error al crear notificación:", error);
        },
    });
}
