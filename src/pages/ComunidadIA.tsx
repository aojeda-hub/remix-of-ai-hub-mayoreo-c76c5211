import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useCommunityPosts, useCreatePost, useAddComment, useToggleReaction } from "@/hooks/use-community";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, ThumbsUp, Plus, Send } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = [
  { value: "preguntas_tecnicas", label: "Preguntas técnicas" },
  { value: "casos_practicos", label: "Casos prácticos" },
  { value: "prompts_utiles", label: "Prompts útiles" },
  { value: "automatizaciones", label: "Automatizaciones" },
  { value: "buenas_practicas", label: "Buenas prácticas por departamento" },
  { value: "testimonios", label: "Testimonios" },
];

const CAT_LABELS: Record<string, string> = Object.fromEntries(CATEGORIES.map(c => [c.value, c.label]));

export default function ComunidadIA() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filterCat, setFilterCat] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "preguntas_tecnicas", tags: "" });
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const { data: posts = [], isLoading } = useCommunityPosts();

  // Note: We'll still need reactions from a general fetch for the whole list if we want to avoid multiple queries,
  // but for now let's keep it simple or stick to the previous pattern if more efficient.
  // Actually, useCommunityPosts now fetches profiles!

  const { data: reactions = [] } = useQuery({
    queryKey: ["community_reactions_all"],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("community_reactions").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: allComments = [] } = useQuery({
    queryKey: ["community_comments_all"],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("community_comments").select("*").order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const createPostMutation = useCreatePost();
  const addCommentMutation = useAddComment();
  const toggleReactionMutation = useToggleReaction();

  const handleCreatePost = () => {
    const tags = newPost.tags.split(",").map(t => t.trim()).filter(Boolean);
    createPostMutation.mutate({
      user_id: user!.id,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      tags,
    }, {
      onSuccess: () => {
        setShowNew(false);
        setNewPost({ title: "", content: "", category: "preguntas_tecnicas", tags: "" });
      }
    });
  };

  const handleAddComment = (postId: string) => {
    const text = commentText[postId];
    if (!text?.trim()) return;
    addCommentMutation.mutate({
      post_id: postId, user_id: user!.id, content: text,
    }, {
      onSuccess: () => {
        setCommentText(prev => ({ ...prev, [postId]: "" }));
        // Also invalidate the global comments if we are using it
        queryClient.invalidateQueries({ queryKey: ["community_comments_all"] });
      }
    });
  };

  const handleToggleReaction = (postId: string) => {
    const existing = reactions.find((r: any) => r.post_id === postId && r.user_id === user!.id && r.reaction === "👍");
    toggleReactionMutation.mutate({
      postId,
      userId: user!.id,
      reaction: "👍",
      hasReacted: !!existing
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["community_reactions_all"] });
      }
    });
  };


  const filteredPosts = filterCat === "all" ? posts : posts.filter((p: any) => p.category === filterCat);

  if (isLoading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comunidad IA Mayoreo</h2>
        <Dialog open={showNew} onOpenChange={setShowNew}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Nueva Publicación</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nueva Publicación</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select value={newPost.category} onValueChange={(v) => setNewPost(p => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={newPost.title} onChange={(e) => setNewPost(p => ({ ...p, title: e.target.value }))} placeholder="Título de tu publicación" />
              </div>
              <div className="space-y-2">
                <Label>Contenido</Label>
                <Textarea value={newPost.content} onChange={(e) => setNewPost(p => ({ ...p, content: e.target.value }))} placeholder="Escribe tu publicación..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Etiquetas (separadas por coma)</Label>
                <Input value={newPost.tags} onChange={(e) => setNewPost(p => ({ ...p, tags: e.target.value }))} placeholder="ia, automatización, ventas" />
              </div>
              <Button onClick={() => handleCreatePost()} disabled={!newPost.title || !newPost.content} className="w-full">Publicar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={filterCat === "all" ? "default" : "outline"} className="cursor-pointer" onClick={() => setFilterCat("all")}>Todas</Badge>
        {CATEGORIES.map(c => (
          <Badge key={c.value} variant={filterCat === c.value ? "default" : "outline"} className="cursor-pointer" onClick={() => setFilterCat(c.value)}>{c.label}</Badge>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post: any) => {
          const postComments = allComments.filter((c: any) => c.post_id === post.id);
          const postReactions = reactions.filter((r: any) => r.post_id === post.id && r.reaction === "👍");
          const userReacted = postReactions.some((r: any) => r.user_id === user?.id);
          const isExpanded = expandedPost === post.id;
          const authorName = post.profiles?.full_name || "Usuario";

          return (
            <Card key={post.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">{CAT_LABELS[post.category] || post.category}</Badge>
                    <CardTitle className="text-base">{post.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {authorName} · {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{post.content}</p>
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                )}
                <div className="flex items-center gap-4 pt-2 border-t">
                  <Button variant="ghost" size="sm" onClick={() => handleToggleReaction(post.id)} className={userReacted ? "text-primary" : ""}>
                    <ThumbsUp className="mr-1 h-4 w-4" fill={userReacted ? "currentColor" : "none"} />{postReactions.length}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setExpandedPost(isExpanded ? null : post.id)}>
                    <MessageSquare className="mr-1 h-4 w-4" />{postComments.length} comentarios
                  </Button>
                </div>

                {isExpanded && (
                  <div className="space-y-3 pt-2 border-t">
                    {postComments.map((c: any) => (
                      <div key={c.id} className="pl-4 border-l-2 border-muted">
                        <p className="text-sm">{c.content}</p>
                        <p className="text-xs text-muted-foreground">{c.profiles?.full_name || "Usuario"} · {new Date(c.created_at).toLocaleDateString()}</p>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Escribe un comentario..."
                        value={commentText[post.id] || ""}
                        onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                      />
                      <Button size="icon" onClick={() => handleAddComment(post.id)}><Send className="h-4 w-4" /></Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
        {filteredPosts.length === 0 && (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No hay publicaciones aún. ¡Sé el primero!</CardContent></Card>
        )}
      </div>
    </div>
  );
}
