# $1: MONGOOSE_DB_NAME, $2: timeNow, $3: filenameZip, $4: time7daysBefore

sudo mongodump --db $1 --out /var/backups/mongobackups/$1_$2

#sudo zip -r /var/backups/mongobackups/$2/$3.zip /var/backups/mongobackups/$2/$1