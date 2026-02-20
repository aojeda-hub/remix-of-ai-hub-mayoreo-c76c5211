import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export interface UserProfile {
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  country: string | null;
  company_id: string | null;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const { data } = await (supabase as any)
        .from("profiles")
        .select("user_id, full_name, email, phone, country, company_id, companies(name)")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setProfile({
          ...data,
          company: data.companies?.name || (user.user_metadata?.company ?? null),
          country: data.country || (user.user_metadata?.country ?? null),
          full_name: data.full_name || (user.user_metadata?.full_name ?? null),
          email: data.email || user.email || null,
          company_id: data.company_id ?? null,
        });
      } else {
        // No profile row yet, use auth metadata
        setProfile({
          user_id: user.id,
          full_name: user.user_metadata?.full_name ?? null,
          email: user.email ?? null,
          phone: null,
          company: user.user_metadata?.company ?? null,
          country: user.user_metadata?.country ?? null,
          company_id: null,
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
}
