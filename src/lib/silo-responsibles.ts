// Responsables de Métodos por Silo.
// Cada silo tiene una persona responsable de métodos que puede modificar/eliminar
// cualquier iniciativa registrada en ese silo (además del dueño y los admins).

export interface SiloResponsible {
  name: string;
  email: string;
}

// Las claves se normalizan a minúsculas para coincidir con el valor almacenado en BD
export const SILO_RESPONSIBLES: Record<string, SiloResponsible> = {
  "logística": { name: "Edgar Monagas", email: "emonagas@mayoreo.biz" },
  "logistica": { name: "Edgar Monagas", email: "emonagas@mayoreo.biz" },
  "personal": { name: "Ambar Pulido", email: "apulido@mayoreo.biz" },
  "compras": { name: "Ambar Pulido", email: "apulido@mayoreo.biz" },
  "ventas": { name: "Mayte Zarraga", email: "mzarraga@mayoreo.biz" },
  "mercadeo": { name: "Mayte Zarraga", email: "mzarraga@mayoreo.biz" },
  "control": { name: "Paola Rodriguez", email: "prodriguez@mayoreo.biz" },
  "sistemas": { name: "Edgar Monagas", email: "emonagas@mayoreo.biz" },
};

export function getSiloResponsible(silo?: string | null): SiloResponsible | null {
  if (!silo) return null;
  return SILO_RESPONSIBLES[silo.toLowerCase().trim()] ?? null;
}

export function isSiloResponsible(silo?: string | null, email?: string | null): boolean {
  if (!silo || !email) return false;
  const resp = getSiloResponsible(silo);
  if (!resp) return false;
  return resp.email.toLowerCase() === email.toLowerCase();
}
