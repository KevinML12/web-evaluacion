# 🎓 Web Evaluación - Deploy & Monitoring Automatizado

Este proyecto es una aplicación web interactiva desarrollada para la evaluación técnica de despliegues modernos. Demuestra la implementación de un flujo de trabajo completo ("End-to-End"), abarcando desde el desarrollo del código y pruebas unitarias, hasta el empaquetado en contenedores, orquestación, exposición pública segura y monitorización externa.

## 🚀 Tecnologías y Herramientas

- **Frontend:** HTML5, Vanilla CSS (Variables, Flexbox, Glassmorphism), Vanilla JavaScript.
- **Persistencia:** LocalStorage (Navegador del cliente).
- **Testing:** Jest (Pruebas Unitarias).
- **Contenedores:** Docker, DockerHub (Container Registry).
- **Servidor Web:** Nginx (Alpine Linux).
- **Orquestación:** Docker Compose (vía Portainer).
- **Redes / Túneles:** Cloudflare Quick Tunnels (`cloudflared`).
- **Monitorización:** UptimeRobot.
- **Control de Versiones:** Git & GitHub (Flujo basado en Ramas y Tags).

---

## 🏗️ Arquitectura y Buenas Prácticas

### 1. Control de Versiones (Git)
Se implementó un flujo de trabajo profesional para el código fuente:
- `main`: Rama principal para código estable y listo para producción.
- `dev`: Rama de desarrollo para probar nuevas características (Features).
- **Tags Semánticos**: Uso de etiquetas (`v1.0.0`, `v1.1.0`) para marcar hitos estables y permitir un fácil "rollback" (reversión).

### 2. Contenerización (Docker)
- **Imagen Base Ligera:** Se utilizó `nginx:alpine` para reducir el peso de la imagen y minimizar vulnerabilidades de seguridad.
- **Metadatos:** El `Dockerfile` incluye etiquetas `LABEL` (maintainer, version, description) para trazabilidad.
- **.dockerignore:** Implementado para evitar que archivos innecesarios (`node_modules`, archivos de prueba, `.git`) se copien al contenedor.

### 3. Orquestación y Exposición Segura
- **Docker Compose:** Se utilizó un archivo `docker-compose.yml` para definir y ejecutar la aplicación multicontenedor.
- **Redes Internas:** El contenedor de la web NO expone puertos al exterior (`host`). Toda la comunicación se enruta de forma segura a través del túnel de Cloudflare, reduciendo drásticamente la superficie de ataque.

---

## 🛠️ Ejecución Local (Desarrollo)

Si deseas probar el código fuente y ejecutar las pruebas localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/KevinML12/web-evaluacion.git
   cd web-evaluacion
   ```
2. Instala las dependencias (necesario para Jest):
   ```bash
   npm install
   ```
3. Ejecuta las pruebas unitarias:
   ```bash
   npm test
   ```

---

## 🐳 Despliegue en Producción (Portainer)

Para desplegar el proyecto completo (Página Web + Túnel Cloudflare) en un entorno de producción como Portainer:

1. Abre tu panel de **Portainer**.
2. Ve a la sección **Stacks** y haz clic en **Add stack**.
3. Nombra el stack (ej. `web-evaluacion`).
4. Selecciona el **Web editor** y pega el contenido del archivo `docker-compose.yml` ubicado en la raíz de este proyecto.
5. Haz clic en **Deploy the stack**.

Una vez que los contenedores estén en estado *Running*, puedes verificar los **Logs** del contenedor `cloudflared-tunnel` para obtener tu URL pública generada automáticamente por Cloudflare (terminación `.trycloudflare.com`).

---

## 📈 Monitorización

El estado de la aplicación ("Uptime") está siendo supervisado constantemente por **UptimeRobot**. El monitor realiza peticiones periódicas al enlace público de Cloudflare para asegurar que el servicio (`HTTP 200 OK`) se mantiene en línea, enviando alertas inmediatas en caso de caída.

---
*Desarrollado por Kevin Alexander Méndez López*
