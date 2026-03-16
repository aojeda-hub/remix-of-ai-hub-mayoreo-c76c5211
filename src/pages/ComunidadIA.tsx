import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRole } from "@/hooks/use-role";
import { useCommunityPosts, useCreatePost, useAddComment, useToggleReaction, useDeletePost, useUpdatePost } from "@/hooks/use-community";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MessageSquare, ThumbsUp, Plus, Send, Pencil, Trash2 } from "lucide-react";
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
  const { isAdmin } = useRole();
  const queryClient = useQueryClient();
  const [filterCat, setFilterCat] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "preguntas_tecnicas", tags: "" });
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ title: "", content: "", category: "", tags: "" });

  const { data: posts = [], isLoading } = useCommunityPosts();

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
  const deletePostMutation = useDeletePost();
  const updatePostMutation = useUpdatePost();

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

  const handleDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  const openEditDialog = (post: any) => {
    setEditingPost(post);
    setEditForm({
      title: post.title,
      content: post.content,
      category: post.category,
      tags: (post.tags || []).join(", "),
    });
  };

  const handleUpdatePost = () => {
    if (!editingPost) return;
    const tags = editForm.tags.split(",").map(t => t.trim()).filter(Boolean);
    updatePostMutation.mutate({
      id: editingPost.id,
      title: editForm.title,
      content: editForm.content,
      category: editForm.category,
      tags,
    }, {
      onSuccess: () => setEditingPost(null),
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
            <DialogHeader>
              <DialogTitle>Nueva Publicación</DialogTitle>
              <DialogDescription>Comparte contenido con la comunidad</DialogDescription>
            </DialogHeader>
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
                      {authorName} {post.profiles?.email ? `(${post.profiles.email})` : ""} · {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-1 ml-2 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEditDialog(post)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar publicación?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Se eliminarán también los comentarios y reacciones asociados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeletePost(post.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
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

      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Publicación</DialogTitle>
            <DialogDescription>Modifica los campos de la publicación</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select value={editForm.category} onValueChange={(v) => setEditForm(p => ({ ...p, category: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={editForm.title} onChange={(e) => setEditForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Contenido</Label>
              <Textarea value={editForm.content} onChange={(e) => setEditForm(p => ({ ...p, content: e.target.value }))} rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Etiquetas (separadas por coma)</Label>
              <Input value={editForm.tags} onChange={(e) => setEditForm(p => ({ ...p, tags: e.target.value }))} />
            </div>
            <Button onClick={handleUpdatePost} disabled={!editForm.title || !editForm.content} className="w-full">Guardar cambios</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
