// BPA hierarchy: Silo -> Grupo BPA -> Proceso -> Actividad -> Tarea
// Grupo BPA is derived from Silo per organizational architecture.

export type TaskNode = string;
export type ActivityNode = { name: string; tasks: TaskNode[] };
export type ProcessNode = { name: string; activities: ActivityNode[] };
export type SiloNode = {
  name: string;
  bpaGroups: { value: string; label: string }[];
  processes: ProcessNode[];
};

// Map silos to which BPA groups they belong to
export const SILO_TO_GROUPS: Record<string, { value: string; label: string }[]> = {
  Logística: [{ value: "SOP", label: "SOP — Soporte" }, { value: "CV", label: "CV — Cadena de Valor" }],
  Personal: [{ value: "SOP", label: "SOP — Soporte" }],
  Compras: [{ value: "CV", label: "CV — Cadena de Valor" }],
  Ventas: [{ value: "CV", label: "CV — Cadena de Valor" }],
  Mercadeo: [{ value: "CV", label: "CV — Cadena de Valor" }, { value: "SOP", label: "SOP — Soporte" }],
  Control: [{ value: "SOP", label: "SOP — Soporte" }, { value: "PL", label: "PL — Planificación" }, { value: "CV", label: "CV — Cadena de Valor" }],
  Sistemas: [{ value: "SOP", label: "SOP — Soporte" }],
};

// Process -> which BPA group it belongs to (within its silo)
export const PROCESS_GROUP: Record<string, string> = {
  // Logística
  "Logística|Alisto y facturación": "CV",
  "Logística|Comercio Exterior": "SOP",
  "Logística|Despacho y Transporte": "CV",
  "Logística|Recepción y Almacenaje de Mercancía": "CV",
  "Logística|Atención al cliente": "CV",
  "Logística|Compra": "CV",
  "Logística|Gestión de inventario": "SOP",
  "Logística|Logística": "SOP",
  // Personal — todos SOP
  "Personal|Captación": "SOP",
  "Personal|Desarrollo": "SOP",
  "Personal|Administracion de Personal (Compensación, Bienestar y beneficios)": "SOP",
  "Personal|Seguridad y salud laboral": "SOP",
  "Personal|Servicios internos": "SOP",
  // Compras — todos CV
  "Compras|Definición de Surtido": "CV",
  "Compras|Estudio de Factibilidad": "CV",
  "Compras|Negociación con Proveedores": "CV",
  "Compras|Compra": "CV",
  "Compras|Seguimiento Proveedores": "CV",
  // Ventas — todos CV
  "Ventas|Administración de Clientes": "CV",
  "Ventas|Evaluación potencial de la zona": "CV",
  "Ventas|Administración de Ventas": "CV",
  "Ventas|Negociación de Venta": "CV",
  "Ventas|Administración de Cobranza": "CV",
  "Ventas|(Sin proceso específico)": "CV",
  // Mercadeo
  "Mercadeo|Gestión de Comunicación": "SOP",
  "Mercadeo|Gestión de Publicidad": "SOP",
  "Mercadeo|Oferta del Producto": "CV",
  // Control
  "Control|Ejecución y Control del Plan Financiero": "SOP",
  "Control|Gestión de Crédito y Cobranza": "CV",
  "Control|Control de Inventarios": "SOP",
  "Control|Registro y Control de las Operaciones Contables": "SOP",
  "Control|Legal": "SOP",
  "Control|Monitoreo": "PL",
  "Control|Formulación del Presupuesto Operativo": "PL",
  // Sistemas
  "Sistemas|Ejecución de Proyectos": "SOP",
  "Sistemas|Emisión, Revisión y Aprobación de Documentos": "SOP",
};

export const BPA_HIERARCHY: SiloNode[] = [
  {
    name: "Logística",
    bpaGroups: SILO_TO_GROUPS["Logística"],
    processes: [
      {
        name: "Alisto y facturación",
        activities: [
          { name: "Apartado de mercancía", tasks: ["Apartado"] },
          { name: "Facturación", tasks: ["Facturación", "Facturación Cofersa", "Facturación MP", "Facturacion Venezuela"] },
          { name: "Alisto de pedidos", tasks: ["Alisto de pedidos", "Verificación y cierre de pedidos"] },
          { name: "Preparación y entrega de pedidos Taller", tasks: ["Preparación y entrega de pedidos Taller"] },
          { name: "Despacho de pedidos", tasks: ["Etiquetado y preparación para despacho"] },
        ],
      },
      {
        name: "Comercio Exterior",
        activities: [
          {
            name: "Importación de mercancía",
            tasks: [
              "Digitalización Expedientes de Importación",
              "Cálculo de impuesto de importación",
              "Consolidación de carga en origen",
              "Negociación y seguimiento de términos Incoterms",
              "Gestión de seguros de carga internacional",
              "Ingreso al régimen aduanero",
              "Gestión de permisos y requisitos arancelarios",
              "Coordinación con agentes de aduanas",
              "Revisión y validación de documentos aduanales",
              "Despacho e internamiento de mercancías",
              "Gestión de riesgos logísticos",
            ],
          },
          {
            name: "Generación de Certificado de Origen",
            tasks: [
              "CO Venezuela",
              "CO Costa Rica Comercializadora China",
              "CO Costa Rica Comercializadora Colombia",
              "CO Costa Rica Importado Directo",
              "CO Costa Rica CAFTA",
              "CO Costa Rica DIAN Colombia",
              "CO Costa Rica México",
            ],
          },
        ],
      },
      {
        name: "Despacho y Transporte",
        activities: [
          {
            name: "Despacho de pedidos",
            tasks: [
              "Despacho",
              "Procesos de despacho",
              "Impresión de guías de despacho",
              "Empaque de la mercadería",
              "Pesaje de la mercadería",
              "Impresión de palet de despacho",
              "Traslado hacia zona de despacho",
              "Consolidación de pedidos por ruta",
              "Pre-despacho de los bultos",
              "Proceso de despacho en eflow WMS",
              "Carga física de unidades de transporte",
            ],
          },
          { name: "Cliente retira", tasks: ["Cliente retira"] },
          {
            name: "Entrega de pedidos",
            tasks: [
              "Liquidación de viajes",
              "Gestión de transporte y coordinación con transportistas",
              "Cierre de guía y documentación de entrega",
              "Planificación de rutas de distribución",
              "Control de entregas (POD)",
            ],
          },
          { name: "Transporte", tasks: ["Uso DM de Fletes"] },
        ],
      },
      {
        name: "Recepción y Almacenaje de Mercancía",
        activities: [
          {
            name: "Liquidación de mercancía",
            tasks: [
              "Liquidacion de Importaciones Cof, MP y VE",
              "Liquidacion de Embarques Nacionales Cofersa",
              "Liquidacion de Embarques Nacionales VE",
            ],
          },
          { name: "Manejo de garantías, averiados y daño en empaque", tasks: ["Manejo Devoluciones y Dañados identificados en almacén"] },
          {
            name: "Almacenaje de mercancía",
            tasks: [
              "Manejo de Múltiples Bodegas de Despacho",
              "Manejo Devoluciones y Dañados identificados en almacén",
              "Reposición entre bodegas Mundial de Partes",
              "Almacenaje",
              "Parámetros de resurtido",
              "Recepción de mercancía",
              "Estándar de Paletas para Almacén",
              "Asignación de ubicaciones",
              "Ubicación por medio de tarea automática en eflow WMS",
              "Movimiento físico de la mercadería",
              "Asignación de ubicación por tipo de picking",
              "Configuración de puntos de reorden y máximos",
              "Atención de acciones automáticas de reposición",
              "Movimiento físico de ubicaciones de almacenaje a picking",
              "Devolución de mercadería sobrante",
              "Recepción del pedido por medio de eflow WMH",
              "Generacion automática de acciones",
              "Aceptación de acciones de picking automáticas",
              "Selección de artículos conforme secuencia de picking",
              "Finalización de viaje de alisto",
              "Lectura de palet de preparación",
              "Chequeo físico de la mercadería",
              "Control de alertas de picking",
              "Configuración de ubicaciones picking en eflow WMS",
              "Manual Estándar de Paletas",
              "Creacion de palet master durante la jornada",
            ],
          },
          { name: "Devolución a Proveedor", tasks: ["Devolucion al Proveedor"] },
          {
            name: "Devolución de mercancía clientes",
            tasks: [
              "Devolución al cliente",
              "Solicitudes, devoluciones y cambios para clientes",
              "Recepción de devolución",
              "Inspección y clasificación de los artículos",
              "Reingreso de la mercadería a inventario",
              "Creación de confirmación de devolución en eflow WMS",
            ],
          },
          { name: "Solicitud de pedidos y suministros de Taller", tasks: ["Solicitud de pedidos WMS - ERP. Taller", "Solicitud de pedidos y suministros"] },
          { name: "Recepción y almacenaje de mercancía Taller", tasks: ["Recepción y almacenaje de mercancía Taller"] },
          { name: "Reconocimiento de garantías Proveedores Taller", tasks: ["Reconocimiento de garantías Proveedores Taller"] },
          {
            name: "Recepción de mercancía",
            tasks: [
              "Manejo de sobrantes y faltantes en la recepción",
              "Definición de prioridades y programación",
              "Arribo de mercancía",
              "Verificación documental",
              "Descarga de mercancía",
              "Etiquetado y clasificación",
              "Ingreso a eflow WMS",
              "Generación de incidencias",
              "Traslado a zona de almacenaje",
              "Control de calidad post-recepción",
              "Recepcion de Mercancia",
            ],
          },
          { name: "Generación de devolución", tasks: ["Generación de devolución"] },
          { name: "Liquidaciones de Embarque Nacional", tasks: ["Liquidaciones de Embarque Nacional"] },
          { name: "Gestión de Niveles de inventario", tasks: ["Gestión de Niveles de inventario"] },
          { name: "Valor agregado", tasks: ["Etiquetado de producto por requerimiento de cliente", "Valor Agregado", "Maquila", "Armado de empaques"] },
          { name: "Reparación de equipo", tasks: ["Repuestos Proveedores"] },
          { name: "Creacion de embarque", tasks: ["Creacion de embarque"] },
          { name: "Generacion de facturas de Compras", tasks: ["Generacion de facturas de Compras"] },
          { name: "Liquidacion del Embarque", tasks: ["Liquidacion del Embarque"] },
          { name: "Generacion de facturas de Compras Importados", tasks: ["Generacion de facturas de Compras Importados"] },
          { name: "Retenciones del Impuesto", tasks: ["Retenciones del Impuesto"] },
          { name: "Registro de facturas proveedores logistico", tasks: ["Registro de facturas proveedores logistico"] },
          { name: "Calculo de importacion", tasks: ["Calculo de importacion"] },
          { name: "Unificacion de Expedientes", tasks: ["Unificacion de Expedientes"] },
        ],
      },
      {
        name: "Atención al cliente",
        activities: [
          { name: "Gestión de tiquetes de reclamos y devoluciones clientes", tasks: ["Gestión de tiquetes de reclamos y devoluciones clientes"] },
          { name: "Gestión de tiquetes", tasks: ["Gestión de tickets. Automatización Servicio al cliente"] },
          { name: "Nivel de Servicio atención solicitudes de clientes", tasks: ["Nivel de Servicio atención solicitudes de clientes"] },
          { name: "Revisión de equipos en garantía Taller", tasks: ["Revisión de equipos en garantía Taller"] },
          { name: "Recepción y procesamiento de Reclamos", tasks: ["Recepción y procesamiento de Reclamos"] },
          { name: "Emisión de Boletas Manuales", tasks: ["Emisión de Boletas Manuales"] },
          { name: "Creación de Tickets de Servicio", tasks: ["Creación de Tickets de Servicio"] },
          { name: "Revisión de Solicitudes", tasks: ["Revisión de Solicitudes"] },
          { name: "Envío de Boletas por correo al área encargada", tasks: ["Envío de Boletas por correo al área encargada"] },
          { name: "Seguimiento de casos", tasks: ["Seguimiento de casos"] },
          { name: "Apoyo al asesor", tasks: ["Apoyo al asesor"] },
          { name: "Cierre de casos", tasks: ["Cierre de casos"] },
          { name: "Solicitar la recolección de la mercancía", tasks: ["Solicitar la recolección de la mercancía"] },
          { name: "Recepcion de solicitudes Reclamos post venta", tasks: ["Recepcion de solicitudes Reclamos post venta"] },
          { name: "Revision de la solicitud", tasks: ["Revision de la solicitud"] },
          { name: "Evaluacion de la solicitud", tasks: ["Evaluacion de la solicitud"] },
          { name: "Emision de la prenota", tasks: ["Emision de la prenota"] },
          { name: "Drive Gestion de Recolectas", tasks: ["Drive Gestion de Recolectas"] },
          { name: "Apoyo al asesor y al cliente", tasks: ["Apoyo al asesor y al cliente"] },
          { name: "Apoyo posibles clientes", tasks: ["Apoyo posibles clientes"] },
        ],
      },
      {
        name: "Compra",
        activities: [
          { name: "Manejo de sobreinventario", tasks: ["Rebaja de Sobreinventario"] },
          { name: "Pronóstico de la demanda", tasks: ["Pronóstico de la demanda"] },
          {
            name: "Reposición de inventarios",
            tasks: [
              "Reposición de inventarios",
              "Reposición de Compras Global",
              "Proceso de backordes",
              "Creación de un nuevo contenedor en MCG",
              "Registro de un nuevo proveedor en MCG",
              "Seguimiento de órdenes en MCG",
              "Proceso de carga automática de OC en streamline",
              "Aprobación de PO",
              "Rev incidencias en expedientes",
              "Parámetros de reposición",
              "Preparación de pedidos",
              "Carga y actualización de parámetros en Streamline",
              "Creación de Órdenes de Compra en Streamline",
            ],
          },
          {
            name: "Compras MCG",
            tasks: [
              "Compras MCG",
              "Creación de proveedores MCG",
              "Generación de documentos de embarque para MCG",
              "Creación de proveedor MCG",
              "Generación de documentos de embarque MCG",
            ],
          },
          { name: "Creación de proveedores", tasks: ["Creación de proveedores MCG"] },
          { name: "Programación Proveedores", tasks: ["Programación de citas proveedores"] },
          { name: "Compra MCG", tasks: ["Generación de documentos de embarque para MCG"] },
          { name: "Rotación de inventario", tasks: ["Revisión rotación de inventarios versus el presupuesto"] },
          { name: "Seguimiento órdenes de compra", tasks: ["Proceso de tracking order"] },
          { name: "Planificación de Ventas y Operaciones", tasks: ["Planificación de Ventas y Operaciones"] },
        ],
      },
      {
        name: "Gestión de inventario",
        activities: [
          { name: "Inventario Cíclico", tasks: ["Conteos cíclicos"] },
          { name: "Identificación de ajustes de inventario", tasks: ["Ajuste de inventario cuando es necesario"] },
          { name: "Inventario Anual", tasks: ["Toma física de mercaderia"] },
        ],
      },
      {
        name: "Logística",
        activities: [
          {
            name: "Logística 3PL",
            tasks: ["Seguimiento SLA 3PL", "Análisis de indicadores", "Aplicación de Ajustes", "Monitoreo de KPIs logísticos"],
          },
        ],
      },
    ],
  },
  {
    name: "Personal",
    bpaGroups: SILO_TO_GROUPS["Personal"],
    processes: [
      {
        name: "Captación",
        activities: [
          { name: "Reclutamiento", tasks: ["Captación de Personal", "Requisicion de personal", "Aprobación de publicación de vacantes en proceso de captación"] },
          { name: "Selección", tasks: ["Entrevista a Candidatos", "Pruebas Psicotécnicas", "Assesment Center", "Exámen Pre-Empleo", "Oferta Salarial"] },
          { name: "Integración", tasks: ["Inducción a Colaboradores", "Uso del Uniforme", "Comedor de la Empresa"] },
        ],
      },
      {
        name: "Desarrollo",
        activities: [
          { name: "Evaluación de Competencias", tasks: ["Evaluación de Competencias"] },
          { name: "Evaluación de Desempeño", tasks: ["Retroalimentación para el Desarrollo"] },
          { name: "Formación", tasks: ["Capacitacion del personal", "Programa de Pasantías"] },
          { name: "Gestión de Sucesión", tasks: ["Sucesión de Personal", "Movilidad de Colaboradores", "Matríz de Crecimiento"] },
        ],
      },
      {
        name: "Administracion de Personal (Compensación, Bienestar y beneficios)",
        activities: [
          { name: "Estructura Organizacional", tasks: ["Estructuras Organizacionales", "Descripcion de Cargos"] },
          { name: "Remuneración", tasks: ["Compensación salarial", "Administración de escala salarial", "Administración de Remuneración Variable", "Viaticos de colaboradores"] },
          { name: "Reconocimiento", tasks: ["Gestión de Reconocimiento", "Reconocimiento por años de servicio"] },
          { name: "Beneficios", tasks: ["Beneficios del Colaborador", "Vacaciones colaborador", "Préstamos a Colaboradores", "Gestion de solicitudes del colaborador"] },
          { name: "Relación con los Colaboradores", tasks: ["Actividades de Bienestar al Colaborador"] },
          { name: "Comunicaciones internas", tasks: ["Comunicaciones internas al Colaborador"] },
          { name: "Trámites Gubernamentales", tasks: ["Gestión de Obligaciones Gubernamentales de Personal", "Asociación Solidarista de las Empresas de Mayoreo en Costa Rica"] },
          {
            name: "Ingreso y Movimientos de Colaborador",
            tasks: [
              "Ingreso del colaborador",
              "Transferencia de colaborador",
              "Ascensos y Promociones",
              "Contratos de Trabajo a Colaboradores",
              "Suspensiones de Colaboradores",
              "Desincorporación de Colaboradores",
            ],
          },
          { name: "Modalidades de trabajo remoto", tasks: ["Teletrabajo"] },
        ],
      },
      {
        name: "Seguridad y salud laboral",
        activities: [
          { name: "Diseño del Programa de Seguridad y Salud Laboral", tasks: ["Plan de Seguridad y Salud Laboral", "Dotación de Equipos de Protección Personal"] },
          {
            name: "Ejecución y seguimiento",
            tasks: [
              "Reporte del Colaborador de Accidentes Laborales",
              "Investigación de Accidentes Laborales",
              "Seguimiento de Gestión de Seguridad y Salud",
              "Equipamiento de primeros Auxilios",
              "Medición de seguridad, Orden y Limpieza",
              "Evaluación de Agua potable",
              "Uso de equipos de protección Personal (EPP)",
              "Almacenamiento en Tarimas",
              "Uso seguro de Montacargas",
            ],
          },
          {
            name: "Seguridad Fisica",
            tasks: [
              "Revisión de Camiones, Montacargas, Apiladores y Otros Vehículos",
              "Control de Acceso a las Instalaciones",
              "Mantenimiento de la Planta Eléctrica",
              "Uso de Lockers en Instalaciones",
              "Revisión del Sistema contra Incendio",
              "Seguridad Vehicular",
              "Certificación Interna de Montacarguistas y Apiladores",
              "Apertura y Cierre de CEDI",
              "Manejo Sistema CCTV",
              "Sistema de Alarma",
              "Administración del servicio de Vigilancia",
              "Uso Seguro de la Banda Transportadora",
              "Norma Para Seguridad de Contratistas",
              "Protocolo para Conato de Incendio",
              "Protocolo de respuestas ante Sismos",
              "Protocolo para manejo de Sustancias peligrosas",
              "Protocolo de Vehiculos cargados para despacho",
              "Trabajo Alto Riesgo",
              "Uso del Estacionamiento",
              "Protocolo para continuidad operativa",
            ],
          },
        ],
      },
      {
        name: "Servicios internos",
        activities: [
          { name: "Proceso de Solicitud de Alimentación, Servicios y Suministros", tasks: ["Norma del Proceso", "Procedimiento del Proceso"] },
        ],
      },
    ],
  },
  {
    name: "Compras",
    bpaGroups: SILO_TO_GROUPS["Compras"],
    processes: [
      {
        name: "Definición de Surtido",
        activities: [
          {
            name: "Deteccion de Necesidades del Mercado",
            tasks: [
              "Construccion del Árbol de Surtido",
              "Organización del surtido",
              "Clasificación BDF de artículos",
              "Instructivo Clasificación BDF Semestral",
              "Gestión de Artículos de Combos y Kits",
              "Criterios para el mantenimiento del Surtido",
              "Depuración de Surtido",
            ],
          },
        ],
      },
      {
        name: "Estudio de Factibilidad",
        activities: [
          {
            name: "Análisis de Proveedores",
            tasks: [
              "Aprobación de Artículos y Proveedores",
              "Evaluacion del surtido",
              "Evaluacion del proveedor",
              "Creación de Artículos",
              "Solicitud de inclusión de articulos",
              "Plantilla comercial - Mayoreo",
              "Plan de trabajo",
            ],
          },
          {
            name: "Análisis de Precios",
            tasks: [
              "Fijación de Precios",
              "Lista de Precio de Venta",
              "Actualización de precios en Softland",
              "Actualización y carga de Costos",
              "Cargador de Descuentos, Precios y Costos",
              "Presupuesto de Compras",
              "Redondeo de precios",
              "Norma cambio de precio",
              "Norma de Promociones",
            ],
          },
        ],
      },
      {
        name: "Negociación con Proveedores",
        activities: [
          {
            name: "Definición de Condiciones Comerciales",
            tasks: [
              "Aceptación de Listas de Precios de proveedores",
              "Información requerida en listas de precios",
              "Identificación y Prospección de Proveedores",
              "Homologación y Alta de Proveedores en el Sistema",
              "Clasificación y Segmentación de Proveedores",
              "Gestión de Contratos con Proveedores",
              "Evaluación del Desempeño de Proveedores (SRM)",
              "Desarrollo de Proveedores",
            ],
          },
        ],
      },
      {
        name: "Compra",
        activities: [
          {
            name: "Análisis de Pedido",
            tasks: ["Código Arancelario", "Cálculo de impuesto de importación", "Incoterms", "Aplicación del Factor de Gastos", "Pedidos Especiales"],
          },
          { name: "Compras MCG", tasks: ["Solicitud de anticipo"] },
          {
            name: "Seguimiento de la Orden de Compra",
            tasks: ["Generación y Aprobación de Órdenes de Compra", "Seguimiento de Órdenes de Compra y Cumplimiento de Proveedores"],
          },
        ],
      },
      {
        name: "Seguimiento Proveedores",
        activities: [
          { name: "Evaluación de desempeño", tasks: ["Ranking"] },
          { name: "Reclamos y garantías", tasks: ["(Sin tarea específica)"] },
        ],
      },
    ],
  },
  {
    name: "Ventas",
    bpaGroups: SILO_TO_GROUPS["Ventas"],
    processes: [
      {
        name: "Administración de Clientes",
        activities: [{ name: "Captación de Nuevos Clientes", tasks: ["Prospección", "Apertura de Cliente"] }],
      },
      {
        name: "Evaluación potencial de la zona",
        activities: [{ name: "Reestructuración de Clientes", tasks: ["Desvinculación de Cliente"] }],
      },
      {
        name: "Administración de Ventas",
        activities: [
          {
            name: "Administración de Estructura de Ventas",
            tasks: [
              "Planificación de Rutas y Agenda",
              "Cambio de Agente",
              "Asesor Tradicional",
              "Televentas",
              "Activos Fijos de la fuerza de venta",
              "Estructura de Venta",
              "Desvinculación de Asesor",
              "BPA",
              "Mapa de reconocimiento",
            ],
          },
          { name: "Definición de los Incentivos y Metas", tasks: ["Plan Comercial", "Presupuesto de Venta"] },
        ],
      },
      {
        name: "Negociación de Venta",
        activities: [
          {
            name: "Emisión de Pedido de Ventas",
            tasks: [
              "Cotización y Propuestas Comerciales",
              "Negociación Especial",
              "Cuentas Clave",
              "Muestra de producto",
              "Portafolio",
              "Regla de flete",
              "Pedidos Softland",
              "Pedidos cuentas clave",
              "AFV",
              "Protocolo de cortesia Televentas",
              "Protocolo de información para prospección",
              "Protocolo de cortesia agente de cartera",
              "Speech de llamada prospección",
              "Protocolo de cortesia de ventas",
              "Carga de pedidos en Softland",
              "Consulta de Clientes/Pedidos/Artículos en Softland",
              "Cotizador Mundial de Partes",
              "Cotizador Softland Cofersa",
              "Ingreso de pedidos EPA CABLE Dólares",
              "Ingreso de pedidos EPA Colones",
              "Ingreso de pedidos Lagar/Gravilia/Papagayo/Unicomer Gollo",
              "Ingreso de pedidos Colonos/El Tanque/El Rey/Hong Kong",
              "Ingreso de pedidos Construplaza",
              "Prospección",
              "Consola Catálogo Digital",
            ],
          },
          { name: "(Sin actividad específica)", tasks: ["Activos fijos fuerza de ventas"] },
        ],
      },
      {
        name: "Administración de Cobranza",
        activities: [{ name: "Procesamiento de Cobranza", tasks: ["Cobranza Preventiva y Gestión de Cartera Vencida"] }],
      },
      {
        name: "(Sin proceso específico)",
        activities: [{ name: "(Sin actividad específica)", tasks: ["Mantenimiento de sistemas asociados a ventas", "Portafolio Acotado"] }],
      },
    ],
  },
  {
    name: "Mercadeo",
    bpaGroups: SILO_TO_GROUPS["Mercadeo"],
    processes: [
      {
        name: "Gestión de Comunicación",
        activities: [
          {
            name: "Gestión de Comunicaciones Internas",
            tasks: [
              "Planificación Estratégica de Marketing",
              "Planificación y Ejecución de Campañas de Mercadeo",
              "Creación y Distribución de Material Promocional",
              "Organización de Eventos y Participación en Ferias",
              "Medición del ROI en Actividades de Mercadeo",
              "Desarrollo y Gestión de Canales de Comercialización",
              "Norma Comunicación externa Mayoreo",
              "Norma Comunicación de apoyo al Cliente",
              "Política de Uso de Marca",
              "Planilla de Política de Uso de Marca",
            ],
          },
        ],
      },
      {
        name: "Gestión de Publicidad",
        activities: [
          {
            name: "Gestión de Comunicaciones Internas",
            tasks: [
              "Creación y Distribución de Contenido",
              "Uso de Redes Sociales y Medios Digitales",
              "Publicidad y Promociones",
              "Privacidad de Datos en Marketing",
              "Investigación de Mercado y Análisis de la Competencia",
            ],
          },
          {
            name: "Gestión de Publicidad de Medios Tradicionales",
            tasks: [
              "Gestión de la Presencia en Redes Sociales",
              "Segmentación de Clientes",
              "Norma de Segmentación de Clientes",
              "Uso y Manejo de Imagen Corporativa Mayoreo",
              "Tipografía Mayoreo",
              "Identidad Corporativa Estilo Mayoreo",
              "Definición de Emblemas Mayoreo",
              "Colores Mayoreo",
              "Identidad Corporativa Estilo Febeca",
              "Base de Clientes Febeca",
              "Identidad Corporativa Estilo Beval",
              "Base de Clientes Beval",
              "Identidad Corporativa Estilo Sillaca",
              "Base de Clientes Sillaca",
              "Identidad Corporativa Estilo Cofersa",
              "Base de Clientes Cofersa",
              "Identidad Corporativa Estilo Mundipartes",
              "Base de Clientes Mundipartes",
            ],
          },
        ],
      },
      {
        name: "Oferta del Producto",
        activities: [
          { name: "Promociones", tasks: ["Push Money"] },
          { name: "Pricing", tasks: ["(Sin tarea específica)"] },
        ],
      },
    ],
  },
  {
    name: "Control",
    bpaGroups: SILO_TO_GROUPS["Control"],
    processes: [
      {
        name: "Ejecución y Control del Plan Financiero",
        activities: [
          { name: "Control de Presupuesto", tasks: ["Administración de Deuda Financiera"] },
          { name: "Conciliaciones bancarias", tasks: ["Conciliación Bancaria", "Instructivo conciliación bancaria"] },
          {
            name: "Cuentas por Pagar",
            tasks: [
              "Creación y mantenimiento de proveedores",
              "Instructivo creación de proveedores",
              "Inactivación de proveedores",
              "Asignación y Gestión de Viáticos",
            ],
          },
          {
            name: "Manejo de Movimientos y saldos en cuentas bancarias",
            tasks: [
              "Administración de Caja Chica Cofersa",
              "Aprobación de pagos",
              "Norma para control de Firmas y Roles Bancarios",
              "Proyección y Monitoreo de Efectivo",
            ],
          },
          { name: "Compras de Servicios y Suministros", tasks: ["Compras de Servicios y Suministros", "Política de Tarjeta Corporativa"] },
          {
            name: "(Sin actividad específica)",
            tasks: [
              "Norma para la creación del Presupuesto Operativo",
              "Normas de Control y registro de Préstamos",
              "Procedimiento pagos mediante generación de txt",
              "Norma para anticipo de gastos de viaje",
            ],
          },
        ],
      },
      {
        name: "Gestión de Crédito y Cobranza",
        activities: [
          {
            name: "Administración de Cobranzas",
            tasks: [
              "Cobranza Extrajudicial",
              "Depósito en Bancos",
              "Aplicación de saldos a favor",
              "Cobro Judicial",
              "Conciliación de Cobranzas",
              "Estimación de Cuentas Incobrables",
              "Elaboración del presupuesto de cobro mensual",
              "Notificaciones de Facturas Vencidas",
              "Reconocimiento de cuentas incobrables",
              "Reconocimiento de pérdidas en cobranzas",
              "Reintegros en Divisas a Clientes",
              "Gestión de Ajustes de Saldos",
              "Administración de la cobranza Cofersa",
              "Anulación de recibos",
              "Manejo de Notas de Crédito y Débito",
              "Activación de Líneas Bancarias Sage XRT",
              "Conciliación de Movimientos en Espera Bancarios",
              "Evaluación de irregularidades en cobranzas",
              "Reactivación de Líneas Bancarias",
              "Instructivo DM Portal de Auditoria",
              "Anexo condiciones para aceptación de billetes en moneda extranjera",
              "Anexo Administración de soportes de Cobranza",
              "Anexo Comprobante de Retención IVA",
              "Instructivo para elaboración de presupuesto de cobro",
            ],
          },
          { name: "Administración Crediticia", tasks: ["Liberación de Pedidos", "Gestión de líneas de crédito"] },
          {
            name: "Administración de Clientes",
            tasks: [
              "Apertura de Clientes",
              "Creación de Cliente Nuevo",
              "Reintegro a Clientes",
              "Activación y desactivación de clientes",
              "Norma - Apertura de clientes",
            ],
          },
          { name: "Apertura de Clientes", tasks: ["Norma - Clientes Corporativos"] },
          {
            name: "(Sin actividad específica)",
            tasks: [
              "Norma - Liberación de Pedido",
              "Norma - Provisión para cuentas de cobro dudoso",
              "Norma Administración de la Cobranza Mayoreo",
              "Norma de aplicación de saldos a favor",
              "Norma para Reintegros a Clientes",
              "Política para Aprobación de Ajustes de Saldos",
              "Procedimiento para la Conciliación de Cobranzas",
              "Procedimiento para la Gestión de Inactivación del Módulo de Ventas",
              "Procedimiento sobre aplicación de saldos a favor",
              "Procedimiento para el Manejo de Notas de Crédito y Débito",
              "Política Crédito y Cobranza Venezuela",
              "Política Crédito y Cobranza Cofersa",
            ],
          },
        ],
      },
      {
        name: "Control de Inventarios",
        activities: [
          { name: "Ajustes de inventario", tasks: ["Registro de Ajustes de Inventario", "Anexo Cuentas Contables Ajustes"] },
          { name: "Administración de Bodegas", tasks: ["Creación de Bodegas"] },
          { name: "Inventario Anual", tasks: ["Toma Física de Inventario (TFI)", "Toma física de inventario"] },
          { name: "Control de inventarios", tasks: ["Creación de ajustes en Softland"] },
          { name: "Toma Física de Inventario", tasks: ["Procedimiento de inventario"] },
        ],
      },
      {
        name: "Registro y Control de las Operaciones Contables",
        activities: [
          {
            name: "Registro de Operaciones Contables",
            tasks: [
              "Conciliación de cuentas transitorias",
              "Registro de Rebates Estimado e Ingreso Real",
              "Registro de Inventarios en Tránsito",
              "Compras de Servicios y Suministros",
              "Gestión y Control de Activos Fijos de Mercadeo",
            ],
          },
          { name: "Control Tributario", tasks: ["Apartado Mensual de ISLR"] },
          {
            name: "(Sin actividad específica)",
            tasks: [
              "Norma para el cuadre contable con auxiliares",
              "Norma para la nacionalización de facturas",
              "Procedimiento para la nacionalización de facturas",
              "Procedimiento de Registro de inventarios en tránsito",
              "Norma para el Registro de Rebates en Compras",
              "Instructivo sobre Tasas de Cambio",
            ],
          },
        ],
      },
      {
        name: "Legal",
        activities: [
          { name: "Regulación y cumplimiento", tasks: ["Gestión de Documentación Legal y Resguardo"] },
          { name: "Representación frente a funcionarios públicos y terceros", tasks: ["Relación con Asesores Legales"] },
          { name: "Derecho Mercantil", tasks: ["Evaluación de Documentos Mercantiles de Proveedores", "Elaboración e Inscripción de Actas de Asamblea"] },
          { name: "Gestión de Documentación Legal", tasks: ["Política de correos institucionales"] },
          {
            name: "(Sin actividad específica)",
            tasks: [
              "Norma de Revisión y Aprobación de Contratos",
              "Norma de Cumplimiento Mercantil",
              "Norma para interposición de procedimientos penales",
              "Procedimiento para atención de fiscalizaciones",
              "Procedimiento para Manejo de Incidentes Delictivos",
              "Procedimiento para Manejo de Apropiaciones indebidas",
              "Procedimiento para Gestión de Notificaciones Legales",
              "Procedimiento para Solicitud de Revisión de Contratos",
            ],
          },
        ],
      },
      {
        name: "Monitoreo",
        activities: [
          { name: "Auditorías Internas", tasks: ["Gestión de Hallazgos de Auditoria", "Control de Acceso Basado en Roles"] },
          { name: "(Sin actividad específica)", tasks: ["Norma Apertura de Clientes", "Norma para la Creación de Bodegas"] },
        ],
      },
      {
        name: "Formulación del Presupuesto Operativo",
        activities: [{ name: "Definición del presupuesto", tasks: ["(Sin tarea específica)"] }],
      },
    ],
  },
  {
    name: "Sistemas",
    bpaGroups: SILO_TO_GROUPS["Sistemas"],
    processes: [
      {
        name: "Ejecución de Proyectos",
        activities: [{ name: "(Sin actividad específica)", tasks: ["Norma de Ejecución de Proyectos"] }],
      },
      {
        name: "Emisión, Revisión y Aprobación de Documentos",
        activities: [{ name: "(Sin actividad específica)", tasks: ["Norma Emisión, Revisión y Aprobación de Documentos"] }],
      },
    ],
  },
];

export const SILOS = BPA_HIERARCHY.map((s) => s.name);

export function getGroupsForSilo(silo: string) {
  const node = BPA_HIERARCHY.find((s) => s.name === silo);
  return node?.bpaGroups ?? [];
}

export function getProcessesForSiloAndGroup(silo: string, group: string) {
  const node = BPA_HIERARCHY.find((s) => s.name === silo);
  if (!node) return [];
  return node.processes.filter((p) => {
    const key = `${silo}|${p.name}`;
    return PROCESS_GROUP[key] === group;
  });
}

export function getActivitiesForProcess(silo: string, processName: string) {
  const node = BPA_HIERARCHY.find((s) => s.name === silo);
  const proc = node?.processes.find((p) => p.name === processName);
  return proc?.activities ?? [];
}

export function getTasksForActivity(silo: string, processName: string, activityName: string) {
  const activities = getActivitiesForProcess(silo, processName);
  const act = activities.find((a) => a.name === activityName);
  return act?.tasks ?? [];
}
