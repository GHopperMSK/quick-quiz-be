-- migrate:up
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(64),
    password VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS website (
    uuid UUID DEFAULT uuid_generate_v4(),
    user_id INTEGER,
    url VARCHAR(255),
    PRIMARY KEY(uuid),
    CONSTRAINT fk_website_user
        FOREIGN KEY(user_id) 
	        REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS website_alias (
    id SERIAL PRIMARY KEY,
    website_uuid UUID,
    alias VARCHAR(255),
    CONSTRAINT fk_website
        FOREIGN KEY(website_uuid) 
	        REFERENCES website(uuid)
);

CREATE TABLE IF NOT EXISTS quiz (
    uuid UUID DEFAULT uuid_generate_v4(),
    user_id INTEGER,
    name VARCHAR(255),
    default_lang VARCHAR(2),
    init_slide_id INT NOT NULL,
    PRIMARY KEY(uuid),
    CONSTRAINT fk_quiz_user
        FOREIGN KEY(user_id) 
	        REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS slide (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER DEFAULT NULL,
    quiz_uuid UUID,
    type VARCHAR(3) NOT NULL,
    lang VARCHAR(2),
    config JSON NOT NULL,
    CONSTRAINT fk_slide
        FOREIGN KEY(parent_id) 
	        REFERENCES "slide"(id),
    CONSTRAINT fk_slide_quiz
        FOREIGN KEY(quiz_uuid) 
	        REFERENCES "quiz"(uuid)  
);

CREATE TABLE IF NOT EXISTS raw_answer (
    quiz_uuid UUID,
    lang VARCHAR(2),
    answer JSON NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_raw_answer_quiz
        FOREIGN KEY(quiz_uuid) 
	        REFERENCES "quiz"(uuid)  
);

-- migrate:down
DROP TABLE IF EXISTS raw_answer;
DROP TABLE IF EXISTS slide;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS website_alias;
DROP TABLE IF EXISTS website;
DROP TABLE IF EXISTS "user";

