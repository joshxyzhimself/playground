FROM node:18
ENV NODE_ENV=production
WORKDIR /app/
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm install --omit=dev
COPY ./ ./
CMD ["node", "./index.mjs"]