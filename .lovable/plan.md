

## 🚀 App de Gestión de Iniciativas IA

### Visión General
Una SPA minimalista con estilo corporativo limpio para registrar y visualizar iniciativas de IA, con autenticación, base de datos en Supabase y estructura preparada para recibir datos automáticos vía webhook.

---

### 1. Autenticación (Login básico)
- Pantalla de login con email/password usando Supabase Auth
- Tabla `profiles` con nombre y rol del usuario
- Redirección automática al dashboard tras login

### 2. Formulario de Registro de Iniciativa (≤4 clics)
- Campos prellenables (preparados para webhook): **Proyecto**, **Tecnología**, **Responsable**
- Campos obligatorios del usuario:
  - **Silo** (dropdown: Compras, Control, Logística, Ventas, Mercadeo, Personal, Sistemas)
  - **Impacto estimado** (High / Medium / Low)
- Campos opcionales colapsables: Problema, Descripción, Link
- Botón **"Registrar"** → estado automático "En Revisión"
- Endpoint/estructura preparada para recibir datos desde n8n webhook (sin conectar aún)

### 3. Dashboard Principal
- **KPIs en cards** en la parte superior:
  - Horas Ahorradas (sumatorio)
  - Proyectos Activos (conteo)
  - Iniciativas en Revisión (conteo)
- **Gráfico de burbujas** (Impacto vs Esfuerzo) usando Recharts
- **Leaderboard por Silo** — ranking visual de iniciativas por área
- **Tabla de iniciativas** con link a cada una
- **Filtros**: por Silo, Estado, Impacto

### 4. Vista de Detalle de Iniciativa
- Todos los campos de la iniciativa
- Posibilidad de editar campos opcionales (Problema, Descripción, Link)
- Historial de estado (En Revisión → Aprobado → En Progreso → Completado)

### 5. Base de Datos (Supabase)
- Tabla `initiatives` con todos los campos mencionados
- Tabla `profiles` vinculada a auth
- RLS para que cada usuario vea todas las iniciativas pero solo edite las suyas
- Campo `source` para distinguir registro manual vs webhook

### 6. Diseño Visual
- Estilo corporativo limpio, colores neutros
- Layout con sidebar de navegación (Dashboard / Registrar / Mis Iniciativas)
- Responsive para desktop y tablet
- Tipografía clara y espaciado generoso

