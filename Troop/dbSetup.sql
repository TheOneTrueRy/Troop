-- Active: 1719377575877@@SG-humane-turtle-7150-9149-mysql-master.servers.mongodirector.com@3306@Sandbox
CREATE TABLE IF NOT EXISTS accounts(
  id VARCHAR(255) NOT NULL primary key COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  name varchar(255) COMMENT 'User Name',
  email varchar(255) COMMENT 'User Email',
  picture varchar(255) COMMENT 'User Picture'
) default charset utf8mb4 COMMENT '';

-- EVENTS --
CREATE TABLE IF NOT EXISTS events(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  creatorId VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(2000) DEFAULT 'No Description Given.',
  coverImg VARCHAR(500) NOT NULL,
  location VARCHAR(50) NOT NULL,
  capacity INT NOT NULL,
  startDate VARCHAR(100) NOT NULL,
  isCanceled BOOLEAN DEFAULT false,
  type VARCHAR(40) NOT NULL,
  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE
) default charset utf8mb4 COMMENT '';

-- TICKETS --
CREATE TABLE IF NOT EXISTS tickets(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  eventId INT NOT NULL,
  accountId VARCHAR(255) NOT NULL,
  FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (accountId) REFERENCES accounts(id) ON DELETE CASCADE
) default charset utf8mb4 COMMENT '';

-- COMMENTS --
CREATE TABLE IF NOT EXISTS comments(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  creatorId VARCHAR(255) NOT NULL,
  eventId INT NOT NULL,
  body VARCHAR(2000),
  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE
) default charset utf8mb4 COMMENT '';