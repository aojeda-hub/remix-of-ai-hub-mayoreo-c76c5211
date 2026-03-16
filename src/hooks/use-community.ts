import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useCommunityPosts() {
    return useQuery({
        queryKey: ["community-posts"],
        queryFn: async () => {
            const { data: posts, error } = await (supabase as any)
                .from("community_posts")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;

            // Fetch profiles for all unique user_ids
            const userIds = [...new Set(posts.map((p: any) => p.user_id).filter(Boolean))];
            let profilesMap: Record<string, any> = {};
            if (userIds.length > 0) {
                const { data: profiles } = await (supabase as any)
                    .from("profiles")
                    .select("id, full_name, email")
                    .in("id", userIds);
                if (profiles) {
                    for (const p of profiles) {
                        profilesMap[p.id] = p;
                    }
                }
            }

            return posts.map((post: any) => ({
                ...post,
                profiles: profilesMap[post.user_id] || null,
            }));
        },
    });
}

export function usePostComments(postId: string) {
    return useQuery({
        queryKey: ["post-comments", postId],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("community_comments")
                .select("*")
                .eq("post_id", postId)
                .order("created_at", { ascending: true });
            if (error) throw error;
            return data;
        },
        enabled: !!postId,
    });
}

export function useCreatePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newPost: any) => {
            const { data, error } = await (supabase as any)
                .from("community_posts")
                .insert(newPost)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community-posts"] });
            toast.success("Publicación creada correctamente");
        },
        onError: (error: any) => {
            toast.error("Error al crear publicación: " + error.message);
        },
    });
}

export function useAddComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newComment: any) => {
            const { data, error } = await (supabase as any)
                .from("community_comments")
                .insert(newComment)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["post-comments", data.post_id] });
            toast.success("Comentario añadido");
        },
        onError: (error: any) => {
            toast.error("Error al añadir comentario: " + error.message);
        },
    });
}

export function usePostReactions(postId: string) {
    return useQuery({
        queryKey: ["post-reactions", postId],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("community_reactions")
                .select("*")
                .eq("post_id", postId);
            if (error) throw error;
            return data;
        },
        enabled: !!postId,
    });
}

export function useToggleReaction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ postId, userId, reaction, hasReacted }: { postId: string; userId: string; reaction: string; hasReacted: boolean }) => {
            if (hasReacted) {
                const { error } = await (supabase as any)
                    .from("community_reactions")
                    .delete()
                    .eq("post_id", postId)
                    .eq("user_id", userId)
                    .eq("reaction", reaction);
                if (error) throw error;
            } else {
                const { error } = await (supabase as any)
                    .from("community_reactions")
                    .insert({ post_id: postId, user_id: userId, reaction });
                if (error) throw error;
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["post-reactions", variables.postId] });
            queryClient.invalidateQueries({ queryKey: ["community-posts"] });
        },
        onError: (error: any) => {
            toast.error("Error al reaccionar: " + error.message);
        },
    });
}
