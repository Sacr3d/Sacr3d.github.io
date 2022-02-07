FROM node:16.4.1-alpine
LABEL "author"="University of Southampton"

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
RUN npm install
COPY src ./src
COPY public ./public
RUN ls -a
RUN npm run build

## stage two
FROM node:16.4.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /app/build ./build

EXPOSE 3000
CMD ["npm", "run", "serve"]