# Centr'All Games Website

This website was developed for **Centr'All Games**, the board game association of the **École Centrale de Lille**.  
It showcases the association’s activities, lists available games, and allows members to explore rules and information for each game.  
Administrators can also manage game borrowing directly from the admin interface.

## Quick start

The site can be deployed easily using Docker by building and publishing an image from the provided `Dockerfile`.

## Quick Start - local setup

To spin up this project locally, follow these steps:

### Development

1. First clone the repo if you have not done so already
2. `cd cag && cp .env.example .env` to copy the example environment variables. For the `PAYLOAD_SECRET` copy the output of `openssl rand -hex 16 | cut -c1-24`. Also add relevant values for `SMTP_HOST` and `SMTP_PORT`. If your production and development environment need different environment variables, create a `.env.local` for development only variables.
3. Set up a local smtp server (for example [fake-smtp-server](https://github.com/gessnerfl/fake-smtp-server)) and modify local environment variables according. You can activate SMTP authentication by uncommenting auth related properties in `src/payload.config.ts` and by adding the relevant environment variables
4. `npm install && npm run dev` to install dependencies and start the dev server
5. Open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Go to `http://localhost:3000/admin` to login and create your first admin user.

### Production

This project use [Docker](https://www.docker.com) to deploy the project. To do so, follow these steps:

1. Build the image `docker build -t YOUR_IMAGE_NAME .`
2. Push the image to your registry `docker push YOUR_IMAGE_NAME:VERSION`
3. Deploy with Docker Compose. An example configuration is available in `docker-compose-production.yml`. Since this project uses SQLite, create an empty database file and mount it into your Docker volume to persist data between deployments.

### Database

This project uses SQLite for simplicity.

If you wish to switch to another database, refer to the Payload documentation: https://payloadcms.com/docs/database/overview
After changing the database adapter, remember to update:

- Dockerfile
- src/payload.config.ts
- .env
