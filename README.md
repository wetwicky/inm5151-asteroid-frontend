# Asteroids.io

## Install

### Requirements

- [docker](https://docs.docker.com/engine/installation/)
- [docker compose](https://docs.docker.com/compose/install/)

### Setup

You might need to run these commands as root/administrator according to your setup.

- Build the docker compose: `docker-compose build`

## How to run

### Activate

- Run the docker compose: `docker-compose up`
  - If you want to run the dockers as a daemon/service: `docker-compose up -d`

### Deactivate

- Quit the docker-compose command with `ctrl+D`
  - If you started docker-compose as a daemon/service, close it with: `docker-compose down`

## Development

There is three main components in this project:

- [RethinkDB](https://www.rethinkdb.com/): The database
- [Phoenix](http://www.phoenixframework.org/): The backend framework coded in [Elixir](http://elixir-lang.org/)
- [React](https://facebook.github.io/react/): The frontend built in ES6 with React

The whole code base is setup to enable auto-reload. That means that you don't have to refresh your web browser after editing a file, Phoenix will watch your source directory for changes, and will refresh everything for you! What a nice tool.

When running in development mode, the website will be accessible at `http://localhost:4000`.
The RethinkDB Database provide an interface to monitor and manage it, that is made available at `http://localhost:8080`.

### Frontend

The frontend is compiled with [Babel](https://babeljs.io/) by [Brunch](http://brunch.io/) build tool in pair with Phoenix.
The react application reside completely in the `web/static/js` directory.
The **html** canvas is located in `web/templates/` that contains the index page as well as a base layout.

The frontend dependencies are handled by [npm](https://www.npmjs.com/). All you have to do is to go to the root of this project and install your frontend dependencies like so: `npm install --save <nameOfDependency1> <nameOfDependency2> <etc>` and they will all be installed in the `package.json` that will be handled by **Brunch** when the docker will build.

[react-game-kit](https://github.com/FormidableLabs/react-game-kit) will be used to manage the game cycle as it is a ligthweight and barebone game library for React.

### Backend

The backend is in Phoenix, built in Elixir, a language that run on the Erlang Virtual Machine. The backend will monitore the source directories for code change and will automatically reload.

The packages are managed with the [hex package manager](https://hex.pm/), a classic for Erlang compatible environment.

The backend will leverage the connection to the database with the [RethinkDB for Elixir](https://github.com/hamiltop/rethinkdb-elixir) library instead of the traditionnal [Ecto](https://github.com/elixir-ecto/ecto).

### Database

The database is a no-sql document database built for soft real-time storage. The main functionnality that will be used in this project is the **live queries**. There is nothing persisted, which mean that the database can be held in memory, without any kind of backup.

