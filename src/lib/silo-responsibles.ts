// Responsables de Métodos por Silo.
// Cada silo tiene una persona responsable de métodos que puede modificar/eliminar
// cualquier iniciativa registrada en ese silo (además del dueño y los admins).

export interface SiloResponsible {
  name: string;
  email: string;
}

// Algunos silos tienen más de un responsable (ej. Control: Paola y Edgar).
const SILO_RESPONSIBLES_MULTI: Record<string, SiloResponsible[]> = {
  "logística": [{ name: "Stephanie Araya", email: "saraya@mayoreo.biz" }],
  "logistica": [{ name: "Stephanie Araya", email: "saraya@mayoreo.biz" }],
  "personal": [{ name: "Angely Ojeda", email: "aojeda@mayoreo.biz" }],
  "compras": [{ name: "Ambar Pulido", email: "apulido@mayoreo.biz" }],
  "ventas": [{ name: "Mayte Zarraga", email: "mzarraga@mayoreo.biz" }],
  "mercadeo": [{ name: "Mayte Zarraga", email: "mzarraga@mayoreo.biz" }],
  "control": [
    { name: "Paola Rodriguez", email: "prodriguez@mayoreo.biz" },
    { name: "Edgar Monagas", email: "emonagas@mayoreo.biz" },
  ],
  "sistemas": [{ name: "Edgar Monagas", email: "emonagas@mayoreo.biz" }],
};

// Compatibilidad: devuelve el primer responsable del silo.
export const SILO_RESPONSIBLES: Record<string, SiloResponsible> = Object.fromEntries(
  Object.entries(SILO_RESPONSIBLES_MULTI).map(([k, v]) => [k, v[0]])
);

export function getSiloResponsible(silo?: string | null): SiloResponsible | null {
  if (!silo) return null;
  return SILO_RESPONSIBLES[silo.toLowerCase().trim()] ?? null;
}

export function getSiloResponsibles(silo?: string | null): SiloResponsible[] {
  if (!silo) return [];
  return SILO_RESPONSIBLES_MULTI[silo.toLowerCase().trim()] ?? [];
}

// Compara solo la parte local del email (antes de @) para que funcione
// con cualquier dominio corporativo (mayoreo.biz, beval.biz, febeca.biz, etc.)
const localPart = (email: string) => email.toLowerCase().split("@")[0].trim();

export function isSiloResponsible(silo?: string | null, email?: string | null): boolean {
  if (!silo || !email) return false;
  const list = getSiloResponsibles(silo);
  const userLocal = localPart(email);
  return list.some((r) => localPart(r.email) === userLocal);
}
