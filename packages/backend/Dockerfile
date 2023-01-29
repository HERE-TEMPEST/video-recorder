FROM node:16.13.2-alpine as build

WORKDIR /app

COPY ./package.json ./yarn.lock ./lerna.json /app/

# Dependencies
COPY ./packages/backend /app/packages/backend
COPY ./packages/typings /app/packages/typings

RUN yarn --frozen-lockfile

RUN yarn install

RUN yarn lerna bootstrap

RUN yarn lerna exec yarn run prisma:generate --parallel --scope=@cv-builder/backend
RUN yarn lerna exec yarn run build --parallel --scope=@cv-builder/backend --include-dependencies

FROM node:16.13.2-alpine

WORKDIR /app

COPY --from=build /app/packages/backend/node_modules /app/packages/backend/node_modules
COPY --from=build /app/packages/backend/prisma /app/packages/backend/prisma
COPY --from=build /app/packages/backend/dist /app/packages/backend/dist
COPY --from=build /app/packages/backend/package.json /app/packages/backend/
COPY --from=build /app/packages/typings /app/packages/typings
COPY --from=build /app/node_modules /app/node_modules
COPY  --from=build /app/package.json /app/
COPY  --from=build /app/lerna.json /app/

CMD yarn lerna exec yarn run prisma:push --parallel --scope=@cv-builder/backend; node packages/backend/dist/main;

