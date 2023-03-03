FROM node:18
ENV NODE_ENV=production

WORKDIR /client/
COPY ["./client/package.json", "./client/package-lock.json", "./"]
RUN npm install --omit=dev
RUN npx vite build

WORKDIR /server/
COPY ["./server/package.json", "./server/package-lock.json", "./"]
RUN npm install --omit=dev

COPY ./server/ ./
CMD ["node", "./index.mjs"]