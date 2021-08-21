
# stage 1
#FROM node:latest as node
#WORKDIR /app
#COPY ../.. .
#RUN npm install
#RUN npm run build --prod

# stage 2
#FROM nginx:alpine
#COPY --from=node dist/AngDockerScss /usr/share/nginx/html

FROM nginx:1.8-alpine
COPY dist/AngularCRUDmedical /usr/share/nginx/html
