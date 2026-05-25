# Analytix 2026 — Dashboard

Dashboard de gestión de clientes con sincronización GitHub, modo claro/oscuro, y exportación de datos.

## Estructura de archivos

| Archivo | Ubicación | Descripción |
|---|---|---|
| index.html | raíz/ | Dashboard principal |
| data/clientes.json | data/ | Base de datos de clientes |
| README.md | raíz/ | Esta documentación |
| .gitignore | raíz/ | Archivos ignorados por Git |

## Funcionalidades

- **Ver/Filtrar/Buscar** clientes en tiempo real
- **Agregar** nuevos clientes con formulario modal
- **Editar** cualquier campo de un cliente
- **Eliminar** clientes con confirmación
- **Notas por cliente** — historial de notas con fecha
- **Descarga de datos** — JSON, CSV, Excel (XLS)
- **Sync con GitHub** — lee y escribe `data/clientes.json` vía API
- **Tema claro/oscuro** — persistido en localStorage

## Configuración del Sync (Paso a paso)

### 1. Subir los archivos a GitHub Pages

1. Crea un repositorio en GitHub: `analytix-dashboard`
2. Sube los archivos:
   - `index.html`
   - `data/clientes.json`
   - `README.md`
   - `.gitignore`
3. Ve a **Settings → Pages → Branch: main → Save**
4. Tu dashboard estará en: `https://TU_USUARIO.github.io/analytix-dashboard/`

### 2. Crear el Personal Access Token (PAT)

1. En GitHub, ve a tu avatar → **Settings**
2. Ve a **Developer settings → Personal access tokens → Fine-grained tokens**
3. Haz clic en **Generate new token**
4. Configura:
   - **Token name**: `analytix-dashboard`
   - **Expiration**: 90 días
   - **Repository access**: Only select repositories → `analytix-dashboard`
   - **Permissions → Contents**: Read and write
5. Copia el token generado

### 3. Configurar el dashboard

1. Abre el dashboard en tu navegador
2. Haz clic en el botón **⚙️ (Gear Config)** del header
3. Completa los campos:
   - **Repositorio**: `tu-usuario/analytix-dashboard`
   - **Ruta del JSON**: `data/clientes.json`
   - **GitHub Token**: pega el PAT copiado
4. Haz clic en **Guardar y conectar**
5. Si el indicador muestra **Sync OK** en verde → conexión exitosa

## Indicadores de estado

| Indicador | Significado |
|---|---|
| 🟢 Listo | Datos cargados correctamente |
| 🟡 Sincronizando | Leyendo datos de GitHub |
| 🔴 Error sync | Fallo en la conexión |

## Exportar datos

Desde la barra de descarga:
- **Descargar JSON** — Formato nativo del proyecto
- **Descargar CSV** — Compatible con cualquier hoja de cálculo
- **Descargar XLSX** — Abre directamente en Excel

## Notas de clientes

Cada cliente tiene un panel de notas accesible desde el botón 📄 en la columna de acciones. Las notas incluyen fecha/hora y se almacenan junto con los datos del cliente.
