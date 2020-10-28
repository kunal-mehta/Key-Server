RUN following commands on local mysql.ABORT
mysqladmin -u root -p password

mysql -u root -p
password: password

This opens the terminal mysql for you.

mysql create database keyserver
mysql use keyserver
mysql create table keystore(
keyid varchar(255) primary key not null,
lastused datetime,
isdelete boolean)

This creates your database and table in it connected on localhost port 3306 with username user and password password