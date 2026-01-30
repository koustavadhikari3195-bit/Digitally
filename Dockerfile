# Stage 1: Build Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Backend & Runner
FROM node:18-alpine
WORKDIR /app

# Add non-root user for security
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./
COPY --from=frontend-build /app/frontend/dist ./public

# Ensure the public directory has correct permissions
RUN chown -R nodeapp:nodeapp /app

USER nodeapp

EXPOSE 5000
ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "server.js"]
