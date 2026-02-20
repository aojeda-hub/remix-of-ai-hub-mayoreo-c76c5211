import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Company {
  id: string;
  name: string;
  country: string;
}

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await (supabase as any)
        .from("ai_companies")
        .select("id, name, country")
        .order("name", { ascending: true });

      if (!error && data) {
        setCompanies(data);
      }
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  /** Dado un nombre de compañía, retorna el país correspondiente */
  const getCountryByCompany = (companyName: string): string => {
    return companies.find((c) => c.name === companyName)?.country ?? "";
  };

  return { companies, loading, getCountryByCompany };
}
