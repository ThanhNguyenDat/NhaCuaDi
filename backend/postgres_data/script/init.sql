-- Table For USER
CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE
);


-- Table For Authen
CREATE TABLE "roles" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);


CREATE TABLE "user_role" (
    id SERIAL PRIMARY KEY,
    -- user_id INTEGER REFERENCES "user"(id),
    -- role_id INTEGER REFERENCES "role"(id),
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT "fk_user_role_users_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
    CONSTRAINT "fk_user_role_roles_id" FOREIGN KEY ("role_id") REFERENCES "roles" ("id")
);


-- Table For Lessons
CREATE TABLE "lessons" (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    description VARCHAR,
    audio_link VARCHAR,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP
);


-- Inser data
INSERT INTO "users" (
    username,
    password,
    email
) VALUES ('admin', 'admin', 'admin@gmail.com'),
        ('student', '$2b$12$mKiyafcRqa6wFg3N6/YQJOuoVbEyGAZB0gDQ5Tbac9meAF11ZTZ5q', 'student@gmail.com'),
        ('guest', 'guest', 'guest@gmail.com');


INSERT INTO "roles" (
    name,
    description
) VALUES ('admin', 'admin description'),
        ('assitance', 'assitance description'),
        ('develop', 'develop description'),
        ('content', 'content description'),
        ('data science', 'data science description'),
        ('data_analysis', 'data analysis description'),
        ('student', 'student description');


INSERT INTO "user_role" (
    user_id,
    role_id
) VALUES (1, 1),
        (1, 2),
        (2, 7);
