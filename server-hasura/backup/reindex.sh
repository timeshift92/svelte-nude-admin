#!/bin/bash

u=postgres

reindex () {
/bin/echo $db >> /var/log/reindex.log
/bin/date >> /var/log/reindex.log
/bin/echo "begin reindex" >> /var/log/reindex.log
/usr/bin/psql  --dbname $db --username $u -w --command "reindex DATABASE $db;" >> /var/log/reindex.log
/bin/date >> /var/log/reindex.log
/bin/echo "end reindex" >> /var/log/reindex.log
/bin/echo "begin vacuum full analyze" >> /var/log/reindex.log
/usr/bin/psql --dbname $db --username $u -w --command "vacuum full analyze;" >> /var/log/reindex.log
/bin/date >> /var/log/reindex.log
/bin/echo "end vacuum full analyze" >> /var/log/reindex.log
}

db=postgres
reindex


