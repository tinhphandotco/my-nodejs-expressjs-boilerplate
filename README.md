# How to use Nodejs Template MVC

## Local Development

### Requirements

Nodejs, Mongodb, Yarn

### Step 1: Install Module dependencies


```

yarn install

```


### Step 2: Create .env file

create a new config file: ```.env``` (copied from ```.env.example```)


### Step 3: Make sure pre-commit is running

```

yarn pre:commit

```

### Step 4: Migrate DB

```

yarn db:migrate

```

### Step 5: Run Project

#### Run app on local with development mode

```yarn start```

#### Run app on local with production mode

```yarn prod:local```

#### Backup DB

```yarn db:backup```

#### Restore DB

Require folder: ```database/backups/db-backups```

Then start restoring DB:

```yarn db:restore```

#### Migrating DB

Create seed data on ```database/seeds```

```yarn db:migrate```


```
Copyright(c) 2019 Tinh Phan <tinh.phan.v@gmail.com>

```