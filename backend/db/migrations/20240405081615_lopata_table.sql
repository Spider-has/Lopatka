-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY unique,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS new_item (
    id SERIAL PRIMARY KEY unique,
    header VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    authorName VARCHAR(255) NOT NULL,
    creationDate VARCHAR(255) NOT NULL,
    description  VARCHAR(255) NOT NULL,
    mainImage  VARCHAR(255) NOT NULL,
    images  VARCHAR(255) NOT NULL,
    theme  VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS news_lists (
    id SERIAL PRIMARY KEY unique,
    user_id int references users (id) on delete cascade NOT NULL,
    new_id int references new_item (id) on delete cascade NOT NULL
);

CREATE TABLE IF NOT EXISTS monument_item (
    id SERIAL PRIMARY KEY,
    header VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    authorName VARCHAR(255) NOT NULL,
    creationDate VARCHAR(255) NOT NULL,
    description  VARCHAR(255) NOT NULL,
    mainImage  VARCHAR(255) NOT NULL,
    images  VARCHAR(255) NOT NULL,
    timeInterval  VARCHAR(255) NOT NULL,
    era VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    coords VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS monuments_lists (
    id SERIAL PRIMARY KEY unique,
    user_id int references users (id) on delete cascade NOT NULL,
    monument_id int references monument_item (id) on delete cascade NOT NULL
);


INSERT INTO users (name, email, password) VALUES ('Админ Админович Кистанов', 'adminTest@lopata.ru', '676873646b6c676a6b616a696f6768776e656b6a677177656e67313334323335b1b3773a05c0ed0176787a4f1574ff0075f7521e');

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS news_lists;
DROP TABLE IF EXISTS monuments_lists;

DROP TABLE IF EXISTS new_item;
DROP TABLE IF EXISTS monument_item;

DROP TABLE IF EXISTS users;
-- +goose StatementEnd
