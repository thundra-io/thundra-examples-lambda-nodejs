CREATE TABLE users(
  id            varchar(40) PRIMARY KEY,
  name          varchar(40),
  creationTime  bigint
);

INSERT INTO users(id, name, creationTime) values(1, 'john', 1535463656357);