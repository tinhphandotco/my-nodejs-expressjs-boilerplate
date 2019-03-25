# How to use Nodejs Template MVC

## Local Development

### Setup

#### Mongodb

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

#### Nodejs

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04

#### Yarn

https://yarnpkg.com/en/docs/install#debian-stable


### Step 1: Install Module dependencies


```

yarn install

```


### Step 2: Create .env file

create a new file ```.env``` in root folder
copy all contents from ```.env.example``` to ```.env``` and change to your local configration


### Step 3: Make sure pre-commit is running

```

yarn pre:commit

```

### Step 4: Migrate DB

```

db:migrate

```

### Step 5: Run Project

#### Start on local

```yarn start```

#### Start production on local

```yarn prod:local```

#### Start production on server

```yarn prod:start```

#### Stop production on server

```yarn prod:stop```


#### Backup DB

```yarn db:backup```

#### Restore DB

Make sure that backup folder is placed in ```database/backups/db-backups```

Then start restoring DB:

```yarn db:restore```

