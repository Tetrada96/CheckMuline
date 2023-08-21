FROM node:16.15-alpine3.14
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 4173
RUN ["npm", "run", "build"]
CMD ["npm", "run", "preview"]