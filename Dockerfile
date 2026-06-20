# Utilizar imagen ligera de Nginx basada en Alpine
FROM nginx:alpine

# Metadatos requeridos por buenas prácticas
LABEL maintainer="Kevin Alexander Méndez López <kevnml>"
LABEL version="1.0.0"
LABEL description="Sitio web de evaluación con persistencia local"

# Eliminar página por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos estáticos al directorio de nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

# Comando para correr nginx en el foreground
CMD ["nginx", "-g", "daemon off;"]
