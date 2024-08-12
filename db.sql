-- Create the database named 'tuf'
CREATE DATABASE IF NOT EXISTS tuf;

-- Use the 'tuf' database
USE tuf;

-- Create the 'banner' table with the specified columns
CREATE TABLE IF NOT EXISTS banner (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Primary key column for unique identification
    description TEXT,                         -- Column for description, which can hold a piece of text
    target_datetime DATETIME,                  -- Column for target datetime
    banner_link VARCHAR(255),                  -- Column for banner link (URL), with a maximum length of 255 characters
    visible BOOLEAN                           -- Column for visibility status (true/false)
);

ALTER TABLE banner
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE banner
ADD COLUMN title VARCHAR(255);

-- Insert some dummy data into the 'banner' table

INSERT INTO banner (description, target_datetime, banner_link, visible) VALUES
('Summer Sale on Electronics!', '2024-08-15 10:00:00', 'https://example.com/summer-sale', TRUE),
('New Arrivals in Fashion', '2024-08-20 12:00:00', 'https://example.com/new-arrivals', TRUE),
('Limited Time Offer on Books', '2024-09-01 09:00:00', 'https://example.com/limited-time-books', FALSE),
('Holiday Deals are Here!', '2024-12-01 08:00:00', 'https://example.com/holiday-deals', TRUE),
('Clearance Sale: Up to 70% Off', '2024-08-30 15:00:00', 'https://example.com/clearance-sale', TRUE);
