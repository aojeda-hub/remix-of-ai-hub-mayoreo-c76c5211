import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Company {
  id: string;
  name: string;
  country: string;
  country_id: string;
}

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await (supabase as any)
        .from("companies")
        .select("id, name, country_id, countries(name)")
        .order("name", { ascending: true });

      if (!error && data) {
        setCompanies(
          data.map((c: any) => ({
            id: c.id,
            name: c.name,
            country_id: c.country_id,
            country: c.countries?.name ?? "",
          }))
        );
      } else if (error) {
        console.error("Error fetching companies:", error);
      }
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  /** Dado un nombre de compañía, retorna el país correspondiente */
  const getCountryByCompany = (companyName: string): string => {
    return companies.find((c) => c.name === companyName)?.country ?? "";
  };

  /** Dado un nombre de compañía, retorna el country_id correspondiente */
  const getCountryIdByCompany = (companyName: string): string => {
    return companies.find((c) => c.name === companyName)?.country_id ?? "";
  };

  return { companies, loading, getCountryByCompany, getCountryIdByCompany };
}
