# 📊 Analytix 2026 - Dashboard de Gestión de Clientes v2.1

Dashboard interactivo profesional para gestionar clientes, componentes y equipos CCTV con **historial de notas completo**, persistencia de datos automática, sincronización GitHub opcional y tema día/noche.

---

## ✨ Características Principales

### 🎯 Gestión de Clientes
- **16 clientes precargados** con datos reales
- **CRUD completo**: Crear, leer, actualizar, eliminar clientes
- **Campos editables**: Cliente, componentes, conexiones, estado, CCTV

### 📝 Sistema de Notas Avanzado ⭐ NUEVA CARACTERÍSTICA
- **Nota actual**: Edita y guarda la nota del cliente (máx. 300 caracteres)
- **📜 Historial completo**: Accede a TODAS las notas anteriores del cliente
- **Timestamp automático**: Cada nota guardada incluye fecha y hora exacta
- **Registro de cambios**: Sabe cuándo se eliminó una nota
- **Contador de caracteres**: Ve cuántos caracteres usaste en tiempo real

#### Cómo funciona:
```
Cliente: COLVISEG

NOTA ACTUAL (La que editas ahora):
"Se completó instalación de NVR nuevo"

HISTORIAL (Notas antiguas):
📅 10/06/2026 10:15:30 | "Comenzó instalación"
📅 10/06/2026 14:20:45 | "Se realizó testeo de cámaras"
📅 11/06/2026 09:30:15 | "Se completó configuración" [ELIMINADA]
```

### 💾 Persistencia de Datos Automática ⭐ NUEVA CARACTERÍSTICA
**TODOS los datos se guardan automáticamente en localStorage:**
- ✅ Clientes y sus datos
- ✅ Notas actuales
- ✅ **HISTORIAL COMPLETO de notas**
- ✅ Tema (oscuro/claro)
- ✅ Configuración de GitHub

**¿Qué significa?**
- Los cambios se guardan **instantáneamente**
- **No se pierden** al cerrar el navegador
- **No se pierden** al actualizar la página
- **Funcionan offline** completamente
- **Sin servidor** requerido

### 📊 KPI en Tiempo Real
- Total clientes
- Grafo OK (%)
- Pendientes (%)
- Total componentes (suma)

### 🎨 Tema Día/Noche
- Botón ☽/☀ en la navegación
- Cambio instantáneo
- Preferencia guardada automáticamente

### 🔍 Búsqueda y Filtros
- Búsqueda por nombre en tiempo real
- Filtros por estado (Todos, OK, Pendiente)

### 📥 Descargas
- **JSON**: Estructura completa
- **CSV**: Excel compatible
- **XLSX**: Se descarga como CSV

### ⚙️ GitHub Sync (Opcional)
- Sincronización segura de datos
- Validación de credenciales
- Historial de cambios en GitHub

---

## 🚀 Inicio Rápido

### 1. Descargar Archivos
Necesitas 3 archivos:
- `index.html` - El dashboard
- `README.md` - Este archivo
- `.gitignore` - Configuración de Git

### 2. Abrir en Navegador
```bash
# Simplemente abre el archivo:
open index.html

# O si usas Python:
python -m http.server 8000
# Luego ve a: http://localhost:8000
```

### 3. ¡Listo!
El dashboard funciona completamente offline. Todos los datos se guardan automáticamente.

---

## 📝 Cómo Usar las Notas

### Agregar una nota
1. Haz clic en **📋** (sin nota) o **📝** (con nota)
2. En el campo "Nueva nota", escribe tu nota
3. Haz clic en **"Guardar nota"**
4. ✅ La nota se guarda (verás 📝 en lugar de 📋)

### Ver historial de notas
1. Abre la modal de notas (haz clic en 📝)
2. Si hay historial, haz clic en **"📜 Ver historial"**
3. Se abre una ventana mostrando:
   - 📅 Fecha y hora de cada nota
   - 📄 Contenido completo
   - 🗑️ Si la nota fue eliminada

### Cambiar una nota
1. Abre la modal de notas
2. La nota **actual** está abajo en "Nota guardada actualmente"
3. Escribe la **nueva nota** arriba en "Nueva nota"
4. Haz clic en **"Guardar nota"**
5. ✅ La nota anterior se archiva en el historial automáticamente

### Eliminar una nota
1. Abre la modal de notas
2. Haz clic en **"🗑 Borrar nota"**
3. Confirma
4. ✅ La nota se marca como [ELIMINADA] en el historial

---

## 💾 Persistencia de Datos - Detalles Técnicos

### ¿Dónde se guardan los datos?
En `localStorage` del navegador (almacenamiento local):
```javascript
// Formato JSON en localStorage
localStorage.analytixClients = `{
  "clientes": [
    {
      "id": 1,
      "cliente": "GBC",
      "componentes": 13,
      "conexiones": 11,
      "grafo": "PENDIENTE",
      "actualizaciones": "Nota actual",
      "historialNotas": [
        {
          "fecha": "10/06/2026 14:30",
          "contenido": "Nota anterior",
          "estado": "NORMAL"
        }
      ]
    }
  ]
}`
```

### Automatización de guardado
```javascript
// Cada vez que haces algo, se guarda automáticamente:

// Crear cliente → saveClients()
// Editar cliente → saveClients()
// Eliminar cliente → saveClients()
// Guardar nota → saveClients()
// Eliminar nota → saveClients()
```

### ¿Se pierden los datos?
| Acción | Datos |
|--------|-------|
| Cerrar pestaña | ✅ Se guardan |
| Actualizar página | ✅ Se guardan |
| Cerrar navegador | ✅ Se guardan |
| Dormir PC | ✅ Se guardan |
| Limpiar caché | ❌ Se pierden |
| Limpiar almacenamiento | ❌ Se pierden |

### Hacer Backup
```bash
# 1. Abre el dashboard
# 2. Haz clic en "⬇ Descargar JSON"
# 3. Se descarga: Analytix_2026.json
# 4. Guárdalo en lugar seguro (Google Drive, etc.)
```

---

## 🌐 CORS - Preguntas Frecuentes

### ¿Qué es CORS?
CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad del navegador que controla acceso entre dominios diferentes.

**Ejemplo**: 
- Dominio A (ejemplo.com) intenta acceder a datos de Dominio B (github.com)
- El navegador bloquea por seguridad
- Se necesita que Dominio B lo permita (con headers CORS)

### ¿Afecta CORS a este dashboard?

**❌ NO - Por estas razones:**

1. **Archivo HTML Estático**
   - El dashboard es un archivo HTML único
   - No realiza requests HTTP a otros dominios
   - Funciona completamente local

2. **localStorage (Sin CORS)**
   - Los datos se guardan en el navegador
   - localStorage NO tiene restricciones CORS
   - Funciona 100% sin problemas

3. **GitHub API (Solo si configuras)**
   - Solo se usa si activas "GitHub Sync"
   - GitHub API permite requests desde navegadores
   - No hay problemas de CORS

4. **Offline Primero**
   - Dashboard funciona sin internet
   - Todos los datos están locales
   - CORS no es un problema

### Cuándo aparecerían errores CORS
```javascript
// ❌ ESTO causaría CORS (pero NO lo hace este dashboard):
fetch('https://api.otro-sitio.com/datos')
  // Error: CORS policy: No 'Access-Control-Allow-Origin' header

// ✅ ESTO funciona (localStorage - lo hace este dashboard):
localStorage.setItem('datos', JSON.stringify(clients))
  // Funciona perfectamente, sin CORS
```

### Conclusión sobre CORS
**NO necesitas preocuparte por CORS** en este dashboard:
- ✅ Almacenamiento local (localStorage)
- ✅ Sin dependencias externas
- ✅ GitHub Sync es opcional
- ✅ Funciona 100% offline

---

## ⚙️ GitHub Sync (Opcional)

### Para qué sirve
Sincroniza tus datos con un repositorio GitHub:
- Backup automático en la nube
- Historial de cambios
- Acceso desde múltiples dispositivos
- Control de versiones

### Cómo configurar

1. **Generar Personal Access Token**
   - Ve a: https://github.com/settings/tokens
   - Clic en "Generate new token (classic)"
   - Selecciona permisos: `repo`, `workflow`, `admin:repo_hook`
   - Copia el token (solo aparece una vez)

2. **Configurar en el dashboard**
   - Haz clic en **⚙** (GitHub Sync)
   - Completa:
     ```
     Repositorio URL: https://github.com/usuario/repo
     Usuario GitHub: tu-usuario
     Personal Access Token: ghp_xxxxxxxxxxxx
     Branch: main
     Archivo JSON: data/clients.json
     ```
   - Haz clic en "Probar conexión"
   - Si es exitoso: ✓ Conectado como [usuario]
   - Haz clic en "Guardar"

---

## 📊 Estructura de Datos

### Objeto Cliente
```javascript
{
  id: 1,
  cliente: "GBC",
  componentes: 13,
  conexiones: 11,
  grafo: "PENDIENTE",
  nvr: 1,
  dvr: 1,
  cam: null,
  actualizaciones: "Nota actual",
  historialNotas: [
    {
      fecha: "10/06/2026 14:30:45",
      contenido: "Nota anterior",
      estado: "NORMAL" // o "ELIMINADA"
    }
  ]
}
```

---

## 🎯 Checklist de Funcionalidades

| Característica | Estado |
|---|---|
| Dashboard funcional | ✅ |
| 16 clientes precargados | ✅ |
| KPI en tiempo real | ✅ |
| CRUD completo | ✅ |
| Notas por cliente | ✅ |
| **Historial de notas** | ✅ |
| **Persistencia en localStorage** | ✅ |
| **Guardar automáticamente** | ✅ |
| Tema día/noche | ✅ |
| GitHub Sync | ✅ |
| Búsqueda y filtros | ✅ |
| Descargas JSON/CSV/XLSX | ✅ |
| Responsive design | ✅ |
| Sin dependencias externas | ✅ |
| **Sin problemas de CORS** | ✅ |

---

## 📱 Compatibilidad

✅ Chrome/Edge 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Navegadores móviles modernos  
✅ Funciona offline

---

## 🆘 Solución de Problemas

### "Perdí mis datos"
→ Verifica que estés usando el mismo navegador. Los datos están en localStorage.

### "Las notas no se guardan"
→ Asegúrate de hacer clic en "Guardar nota" (no solo escribir).

### "Quiero restaurar datos"
→ Descarga JSON regularmente. Si se pierden, ya tendrás backup.

### "Quiero compartir datos"
→ Descarga JSON y comparte el archivo. Otros pueden ver contenido en cualquier editor.

---

## 📋 Versión
**Analytix 2026 v2.1**

**Fecha**: 11 de junio de 2026  
**Estado**: ✅ Listo para producción  
**Última actualización**: Historial de notas + Persistencia completa

---

**¡El dashboard está completamente funcional!** 🎉
