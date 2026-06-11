# 📊 Analytix 2026 - Dashboard de Gestión de Clientes

Dashboard interactivo para gestionar clientes, componentes y equipos CCTV con sincronización GitHub, tema día/noche y almacenamiento local.

## ✨ Características

### Dashboard Principal
- **16 clientes** precargados con datos reales
- **KPI en tiempo real**: Total clientes, Grafo OK, Pendientes, Total componentes
- **Búsqueda y filtros**: Búsqueda por nombre y filtro por estado (OK/PENDIENTE)
- **Tabla responsive**: Datos organizados y fáciles de navegar

### Columnas de la Tabla
| Columna | Descripción |
|---------|------------|
| # | Número de fila |
| Cliente | Nombre del cliente |
| Componentes | Cantidad de componentes |
| Conexiones | Conexiones primarias |
| Grafo | Estado (OK / PENDIENTE) |
| CCTV | Equipos (NVR, DVR, Cámaras) |
| Acciones | Editar, notas, eliminar |

### Sistema de Notas
- **📋 Botón de Notas**: En cada fila, accede a las notas del cliente
- **📝 Indicador activo**: Icono lleno cuando hay notas
- **Modal de notas**:
  - Ver nota guardada actualmente
  - Agregar/editar nueva nota (máx. 300 caracteres)
  - Borrar nota existente
  - Caracteres disponibles en tiempo real

### Tema Día/Noche
- **Botón ☽**: En la esquina superior derecha
- **Tema oscuro** (por defecto): Interfaz con fondo negro
- **Tema claro**: Interfaz con fondo blanco
- **Preferencia guardada**: Se recuerda automáticamente

### GitHub Sync
- **Botón ⚙**: Configuración de sincronización
- **Campos requeridos**:
  - Repositorio URL
  - Usuario GitHub
  - Personal Access Token
  - Branch (main por defecto)
  - Archivo JSON (ruta del archivo)
- **Validación**: Prueba de conexión integrada
- **Auto-sync**: Sincroniza automáticamente al guardar

### Descargas de Datos
- **JSON**: Formato estructurado
- **CSV**: Compatible con Excel
- **XLSX**: Descargado como CSV (Excel lo abre automáticamente)

## 🚀 Inicio Rápido

### 1. Abrir el Dashboard
```bash
# Simplemente abre el archivo en tu navegador
open index.html
```

### 2. Gestionar Clientes

#### Crear nuevo cliente
1. Haz clic en "+ Nuevo cliente"
2. Completa los datos
3. Haz clic en "Guardar"

#### Editar cliente
1. Haz clic en ✎ (editar) en la fila
2. Modifica los datos
3. Haz clic en "Guardar"

#### Agregar/ver notas
1. Haz clic en 📋 o 📝 en la fila
2. Ve la nota guardada actualmente
3. Agrega una nueva nota
4. Haz clic en "Guardar nota"

#### Eliminar cliente
1. Haz clic en 🗑 (eliminar) en la fila
2. Confirma en el diálogo

### 3. Configurar GitHub Sync

**Requisitos previos**:
1. Cuenta GitHub
2. Token personal (Settings > Developer settings > Personal access tokens)

**Pasos**:
1. Haz clic en ⚙ (GitHub Sync)
2. Completa los campos:
   ```
   Repositorio: https://github.com/usuario/repo
   Usuario: tu-usuario
   Token: ghp_xxxxxxxxxxxx
   Branch: main
   Archivo: data/clients.json
   ```
3. Haz clic en "Probar conexión"
4. Si es exitoso, haz clic en "Guardar"

## 📁 Estructura de Archivos

```
.
├── index.html          # Dashboard principal
├── README.md           # Este archivo
└── .gitignore          # Archivos a ignorar en Git
```

## 💾 Almacenamiento de Datos

- **Local**: Todos los datos se guardan en `localStorage` del navegador
- **Persistencia**: Los datos se mantienen incluso después de cerrar la pestaña
- **Sincronización**: Opcional con GitHub
- **Backup**: Descarga JSON regularmente

## 🎨 Temas

### Tema Oscuro (Defecto)
- Fondo: `#0f1117`
- Superficie: `#1a1d27`
- Texto: `#e2e8f0`
- Verde OK: `#22c55e`
- Naranja PENDIENTE: `#f97316`

### Tema Claro
- Fondo: `#f8f9fa`
- Superficie: `#ffffff`
- Texto: `#0d1117`
- Verde OK: `#1a7f37`
- Naranja PENDIENTE: `#bf8700`

## 🔐 Seguridad

- **Credenciales**: Se guardan en `localStorage` de forma segura
- **Acceso**: Solo desde el navegador donde se configuró
- **HTTPS**: Se requiere para sincronización con GitHub

## 📊 Modal de Edición

Campos disponibles:
- **Cliente**: Nombre del cliente (obligatorio)
- **Componentes**: Cantidad de componentes
- **Conexiones Primarias**: Cantidad de conexiones
- **Grafo Relaciones**: OK o PENDIENTE
- **CCTV**:
  - NVR: Network Video Recorder
  - DVR: Digital Video Recorder
  - Cámaras: Cantidad de cámaras
- **Actualizaciones**: Notas en el modal de notas

## 🔄 Indicadores de Estado

| Indicador | Significado |
|-----------|------------|
| OK (verde) | Cliente con grafo correcto |
| PENDIENTE (naranja) | Cliente requiere atención |
| 📝 (nota llena) | Cliente tiene nota guardada |
| 📋 (nota vacía) | Sin nota para este cliente |
| ● Cambios pendientes | Hay datos sin sincronizar |

## ⌨️ Atajos

| Acción | Atajo |
|--------|-------|
| Sincronizar hora | Haz clic en ⟳ |
| Cambiar tema | Haz clic en ☽/☀ |
| GitHub Sync | Haz clic en ⚙ |
| Buscar | Escribe en el campo de búsqueda |
| Filtrar | Selecciona en el dropdown |

## 🆘 Solución de Problemas

### "Las notas no se guardan"
- Asegúrate de hacer clic en "Guardar nota" en el modal
- Verifica que la nota no esté vacía
- Actualiza la página e intenta nuevamente

### "No puedo sincronizar con GitHub"
- Verifica que el token no haya expirado
- Haz clic en "Probar conexión" para validar
- Revisa que la URL del repositorio sea correcta

### "Perdí mis datos"
- Los datos se guardan en `localStorage`
- Intenta abrir en modo incógnito para descartar problemas de caché
- Descarga JSON para tener un backup

### "El tema no se cambia"
- Actualiza la página
- Limpia el caché del navegador
- Intenta en otra pestaña

## 📱 Compatibilidad

- **Navegadores soportados**:
  - Chrome/Edge 90+
  - Firefox 88+
  - Safari 14+
- **Dispositivos**:
  - Desktop
  - Tablet
  - Mobile (responsive)

## 🔄 Versionado

**Versión**: 2.0
**Fecha**: Junio 2026
**Estado**: ✅ Producción

### Cambios v2.0
- ✅ Tema día/noche
- ✅ GitHub Sync con credenciales
- ✅ Modal de notas dedicada
- ✅ Eliminar columna Actualizaciones de tabla
- ✅ Indicador automático de cambios
- ✅ Mejora de UX y diseño

## 📝 Licencia

Proyecto interno - Analytix 2026

## 👤 Autor

Analytix Development Team

## 🤝 Contribuir

Para reportar bugs o sugerencias, contacta al equipo de desarrollo.

---

**¿Necesitas ayuda?** Revisa la documentación completa o contacta al equipo de soporte.
