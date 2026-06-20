# Web Evaluacion - Deploy & Monitoring Automatizado

Este proyecto es una aplicacion web interactiva desarrollada para la evaluacion tecnica de despliegues modernos. Demuestra la implementacion de un flujo de trabajo completo ("End-to-End"), abarcando desde el desarrollo del codigo y pruebas unitarias, hasta el empaquetado en contenedores, orquestacion, exposicion publica segura y monitorizacion externa.

## Tecnologias y Herramientas

- Frontend: HTML5, Vanilla CSS (Variables, Flexbox, Glassmorphism), Vanilla JavaScript.
- Persistencia: LocalStorage (Navegador del cliente).
- Testing: Jest (Pruebas Unitarias).
- Contenedores: Docker, DockerHub (Container Registry).
- Servidor Web: Nginx (Alpine Linux).
- Orquestacion: Docker Compose (via Portainer).
- Redes / Tuneles: Cloudflare Quick Tunnels (cloudflared).
- Monitorizacion: UptimeRobot.
- Control de Versiones: Git & GitHub (Flujo basado en Ramas y Tags).

---

## Arquitectura y Buenas Practicas

### 1. Control de Versiones (Git)
Se implemento un flujo de trabajo profesional para el codigo fuente:
- main: Rama principal para codigo estable y listo para produccion.
- dev: Rama de desarrollo para probar nuevas caracteristicas (Features).
- Tags Semanticos: Uso de etiquetas (v1.0.0, v1.1.0) para marcar hitos estables y permitir un facil "rollback" (reversion).

### 2. Contenerizacion (Docker)
- Imagen Base Ligera: Se utilizo nginx:alpine para reducir el peso de la imagen y minimizar vulnerabilidades de seguridad.
- Metadatos: El Dockerfile incluye etiquetas LABEL (maintainer, version, description) para trazabilidad.
- .dockerignore: Implementado para evitar que archivos innecesarios (node_modules, archivos de prueba, .git) se copien al contenedor.

### 3. Orquestacion y Exposicion Segura
- Docker Compose: Se utilizo un archivo docker-compose.yml para definir y ejecutar la aplicacion multicontenedor.
- Redes Internas: El contenedor de la web NO expone puertos al exterior (host). Toda la comunicacion se enruta de forma segura a traves del tunel de Cloudflare, reduciendo drasticamente la superficie de ataque.

---

## Ejecucion Local (Desarrollo)

Si deseas probar el codigo fuente y ejecutar las pruebas localmente:

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

## Despliegue en Produccion (Portainer)

Para desplegar el proyecto completo (Pagina Web + Tunel Cloudflare) en un entorno de produccion como Portainer:

1. Abre tu panel de Portainer.
2. Ve a la seccion Stacks y haz clic en Add stack.
3. Nombra el stack (ej. web-evaluacion).
4. Selecciona el Web editor y pega el contenido del archivo docker-compose.yml ubicado en la raiz de este proyecto.
5. Haz clic en Deploy the stack.

Una vez que los contenedores esten en estado Running, puedes verificar los Logs del contenedor cloudflared-tunnel para obtener tu URL publica generada automaticamente por Cloudflare (terminacion .trycloudflare.com).

---

## Monitorizacion

El estado de la aplicacion ("Uptime") esta siendo supervisado constantemente por UptimeRobot. El monitor realiza peticiones periodicas al enlace publico de Cloudflare para asegurar que el servicio (HTTP 200 OK) se mantiene en linea, enviando alertas inmediatas en caso de caida.

---
Desarrollado por Kevin Alexander Mendez Lopez
