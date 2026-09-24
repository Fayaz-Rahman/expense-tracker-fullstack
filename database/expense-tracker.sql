select version();
CREATE DATABASE expense_tracker;
USE expense_tracker;
SHOW DATABASES;
show tables;

Create Table expense(
 id INT PRIMARY KEY auto_increment,
 title VARCHAR(100) NOT NULL,
 amount DECIMAL(10,2) NOT NULL,
 category VARCHAR(50),
 expense_date DATE,
 create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
 
 ALTER TABLE expense
RENAME TO expenses;

ALTER TABLE expenses
ADD COLUMN user_id INT NULL,
ADD CONSTRAINT fk_expenses_user
FOREIGN KEY (user_id) REFERENCES users(id);

delete from expenses
where id = 2;

drop TABLE expenses;

select * from expenses;

 DESC expenses;
 
 CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);
 
 DESCRIBE users;
 
 select * from users;
 
 ALTER TABLE users
ADD COLUMN password VARCHAR(255);

SELECT id, title, amount, category, expense_date, user_id
FROM expenses
WHERE title = 'User A Lunch';

CREATE TABLE budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    amount DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_budgets_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,

    CONSTRAINT fk_categories_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_categories_user_name
        UNIQUE (user_id, name)
);

ALTER TABLE expenses
MODIFY category VARCHAR(255) NULL;

ALTER TABLE expenses
MODIFY expense_date DATE NULL;

