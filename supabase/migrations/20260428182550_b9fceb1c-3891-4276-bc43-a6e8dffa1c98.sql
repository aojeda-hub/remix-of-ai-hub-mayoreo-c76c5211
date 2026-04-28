-- Reclasificación oficial de iniciativas IA 2026
-- Mapping: MT->Mejora de Tarea, MP->Mejora de Actividad, TP->Mejora de Proceso

CREATE TEMP TABLE _reclass (project_name text, new_class text);

INSERT INTO _reclass (project_name, new_class) VALUES
  ('Inteligencia Comercial',                                   'Mejora de Actividad'),
  ('Sistema de Acompañamiento de Ventas',                       'Mejora de Proceso'),
  ('Causación Automática de Facturas',                          'Mejora de Actividad'),
  ('Notificación de Egreso de Factura',                         'Mejora de Tarea'),
  ('Notificación de Facturas a Clientes',                       'Mejora de Tarea'),
  ('SmartFeedback AI – Mundipartes',                            'Mejora de Actividad'),
  ('SmartFeedback AI - Mundipartes',                            'Mejora de Actividad'),
  ('Mundi SmartSales',                                          'Mejora de Proceso'),
  ('Análisis de Precios',                                       'Mejora de Tarea'),
  ('Segmentación de Productos según Aplicación',                'Mejora de Tarea'),
  ('Asistente Virtual Mayoreo (Reabastecimiento)',              'Mejora de Actividad'),
  ('Cargador de Movimientos Bancarios',                         'Mejora de Actividad'),
  ('Automatización Indicadores Beconsult',                      'Mejora de Tarea'),
  ('Automatización Detalles de Pago y Órdenes de Nómina',       'Mejora de Actividad'),
  ('Automatización de Prestaciones Sociales',                   'Mejora de Actividad'),
  ('Inteligencia Operativa: Centro de Control Cobranza Beval',  'Mejora de Proceso'),
  ('Cargador de Facturas de Suministros',                       'Mejora de Actividad'),
  ('APP para Vacacionista (Gestión de Ruta)',                   'Mejora de Tarea'),
  ('Cotizador Multi-SKU con Ingreso Masivo',                    'Mejora de Actividad'),
  ('Arquitecto de Procesos Inteligentes (API)',                 'Mejora de Proceso'),
  ('Laboratorio de Innovación Contable',                        'Mejora de Proceso'),
  ('Portal Central de Herramientas Contables',                  'Mejora de Proceso'),
  ('Portal Central de Herramientas',                            'Mejora de Proceso'),
  ('Upscaler de Imágenes para Catálogo Digital',                'Mejora de Tarea'),
  ('Automatización de Envío de Correos Masivos',                'Mejora de Tarea'),
  ('Reporte Consolidado de Saldos a Favor',                     'Mejora de Tarea'),
  ('APP Feria Bosch — Toma de Pedidos',                         'Mejora de Tarea'),
  ('APP Feria Bosch - Toma de Pedidos',                         'Mejora de Tarea'),
  ('Calculadora de Diferencial Cambiario',                      'Mejora de Tarea'),
  ('Automatización de Control Fiscal',                          'Mejora de Tarea'),
  ('Recopilación y Actualización de Datos de Clientes',         'Mejora de Tarea'),
  ('Calculadora de Incentivos — Pedidos PL',                    'Mejora de Tarea'),
  ('Calculadora de Incentivos - Pedidos PL',                    'Mejora de Tarea'),
  ('Gestión de Reclamos (Boletas de Devolución)',               'Mejora de Actividad'),
  ('Simulación de Repuestos en 3D',                             'Mejora de Proceso'),
  ('Herramienta para Gestión de Solicitudes de Compras',        'Mejora de Actividad'),
  ('App Iniciativas IA Mayoreo',                                'Mejora de Tarea');

UPDATE iniciativas.initiatives i
SET description = '[Clasificación: ' || r.new_class || ']'
  || CASE
       WHEN COALESCE(NULLIF(regexp_replace(COALESCE(i.description,''), '^\s*\[Clasificación:\s*[^\]]+\]\s*', ''), ''), '') = '' THEN ''
       ELSE ' ' || regexp_replace(i.description, '^\s*\[Clasificación:\s*[^\]]+\]\s*', '')
     END
FROM _reclass r
WHERE lower(trim(i.project)) = lower(trim(r.project_name));