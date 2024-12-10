# E Commerce App Graphql Crud APIs

This project is an E-Commerce application that provides CRUD APIs using GraphQL.
It is built with TypeScript, Postgresql, Apollo-server and JavaScript, and uses Yarn for dependency management.
## Installation


### Prerequisites
node 20\n
docker\n
docker-compose

Instructions on how to install and set up the project.

```bash
# Clone the repository
git clone https://github.com/deepak29333/e-commerce-graphql-api.git

# Navigate to the project directory
cd e-commerce-graphql-api

# Install dependencies
yarn install

# create .env file and add the following variables
DATABASE_URL="postgresql://postgres:asdf@localhost:5432/graphql_api"

# Create a postgres database container and run migrations
yarn start

# Start the server
yarn dev

# The server should be running on http://localhost:4000

Note:-
1. if you port 5432 already in use then first free that port and run yarn start or you can change the port in docker-compose.yml file.
2. when even you run yarn start it will create a new database and run the migrations so you don't need to run the migrations manually.


#After running the above commands,
whenever you start again you just need to run yarn dev to start the server.
