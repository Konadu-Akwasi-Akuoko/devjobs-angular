# Stage 1: Build the Angular application
FROM node:20 AS build

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN mkdir ~/.pnpm-global
RUN pnpm config set global-bin-dir ~/.pnpm-global/bin
ENV PATH="/root/.pnpm-global/bin:${PATH}"

RUN pnpm install -g @angular/cli

RUN pnpm install

COPY . .

RUN ng build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist/devjobs-angular /app

EXPOSE 4000

CMD ["node", "server/server.mjs"]
