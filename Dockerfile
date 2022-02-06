FROM node:16.4.1-alpine
LABEL "author"="University of Southampton"

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
RUN npm install
COPY src ./src
RUN ls -a
RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]