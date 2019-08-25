# $1: DATABASE_URL $2: DATABASE_FOLDER $3 DATABASE_NAME
sudo mongorestore --uri "$1" $2 --drop --db $3