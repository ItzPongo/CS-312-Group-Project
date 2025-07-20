-- PostgreSQL table creation and sample data for expenses

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT
);

-- sample data
INSERT INTO expenses (amount, date, category, description)
VALUES
    (12.50, '2025-07-01', 'Food', 'Lunch burrito'),
    (45.00, '2025-07-02', 'Gas', 'Fuel refill'),
    (900.00, '2025-07-03', 'Rent/Mortgage', 'July rent'),
    (15.75, '2025-07-04', 'Other', 'Book purchase');
