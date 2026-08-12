-- Create Database
CREATE DATABASE IF NOT EXISTS campus_emergency_response;
USE campus_emergency_response;

-- Users Table (For both Student and Admin)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Emergency Types Table
CREATE TABLE emergency_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Locations Table
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    building_name VARCHAR(100) NOT NULL,
    floor VARCHAR(50),
    area VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Emergency Requests Table
CREATE TABLE emergency_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emergency_code VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    emergency_type_id INT NOT NULL,
    location_id INT NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Pending', 'Responding', 'Resolved', 'Cancelled') DEFAULT 'Pending',
    response_note TEXT,
    responder_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (emergency_type_id) REFERENCES emergency_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE RESTRICT,
    FOREIGN KEY (responder_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Emergency Status History Table
CREATE TABLE emergency_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emergency_request_id INT NOT NULL,
    old_status ENUM('Pending', 'Responding', 'Resolved', 'Cancelled'),
    new_status ENUM('Pending', 'Responding', 'Resolved', 'Cancelled') NOT NULL,
    changed_by INT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (emergency_request_id) REFERENCES emergency_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by) REFERENCES users(id)
);