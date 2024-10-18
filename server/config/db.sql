CREATE DATABASE IF NOT EXISTS travel_blog;
USE travel_blog;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Countries Table
CREATE TABLE IF NOT EXISTS countries (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country_code VARCHAR(2) NOT NULL UNIQUE,
    country VARCHAR(100) NOT NULL
);

-- Cities Table (dependent on countries)
CREATE TABLE IF NOT EXISTS cities (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    country_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(3000) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tags Table
CREATE TABLE IF NOT EXISTS tags (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id INT(11) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Articles Table (dependent on users, countries, cities)
CREATE TABLE IF NOT EXISTS articles (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(3000) NOT NULL,
    content TEXT NOT NULL,
    slug TEXT,
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT(11) UNSIGNED,
    country_id INT(11) UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE SET NULL,
);

-- Posts Table (dependent on users, articles)
CREATE TABLE IF NOT EXISTS posts (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    article_id INT(11) UNSIGNED NOT NULL,
    title VARCHAR(3000) NOT NULL,
    content TEXT NOT NULL,
    slug TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Comments Table (dependent on articles, users)
CREATE TABLE IF NOT EXISTS comments (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    article_id INT(11) UNSIGNED,
    parent_id INT(11) UNSIGNED,
    user_id INT(11) UNSIGNED,
    content TEXT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Pictures Table (dependent on articles)
CREATE TABLE IF NOT EXISTS pictures (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    filepath VARCHAR(255),
    article_id INT(11) UNSIGNED,
    width INT,
    height INT,
    file_size BIGINT,
    file_format VARCHAR(10),
    creation_date DATETIME,
    camera_model VARCHAR(100),
    title VARCHAR(255),
    description TEXT,
    keywords VARCHAR(255),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Likes Table (dependent on articles, users)
CREATE TABLE IF NOT EXISTS likes (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    article_id INT(11) UNSIGNED,
    user_id INT(11) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Post-Category Association Table (dependent on articles, categories)
CREATE TABLE IF NOT EXISTS article_category (
    article_id INT(11) UNSIGNED,
    category_id INT(11) UNSIGNED,
    PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Post-Tag Association Table (dependent on articles, tags)
CREATE TABLE IF NOT EXISTS article_tag (
    article_id INT(11) UNSIGNED,
    tag_id INT(11) UNSIGNED,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_articles_user_id ON articles(user_id);
CREATE INDEX idx_articles_country_id ON articles(country_id);
CREATE INDEX idx_articles_city_id ON articles(city_id);
CREATE INDEX idx_comments_article_id ON comments(article_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_likes_article_id ON likes(article_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_pictures_article_id ON pictures(article_id);
CREATE INDEX idx_article_category_article_id ON article_category(article_id);
CREATE INDEX idx_article_category_category_id ON article_category(category_id);
CREATE INDEX idx_article_tag_article_id ON article_tag(article_id);
CREATE INDEX idx_article_tag_tag_id ON article_tag(tag_id);
