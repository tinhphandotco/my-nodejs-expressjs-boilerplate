# $1: DATABASE_URL, $2: filename

sudo mongodump --uri "$1" --out /var/backups/mongobackups/$2

#sudo zip -r /var/backups/mongobackups/$2/$5.zip /var/backups/mongobackups/$2/$1