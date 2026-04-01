---
name: backend-design
description: 'Design and implement PHP backend logic, APIs, database queries, and server-side functionality for RK Solutions. Use when creating server-side features, building APIs, handling form submissions, managing data persistence, and implementing business logic.'
---

# Backend Design Skill

Specialized skill for designing and implementing backend architecture and PHP logic for RK Solutions web redesign project.

## Project Context

- **Project**: RK Solutions Home redesign
- **Goal**: Capture demo requests and highlight "La Manzana" product
- **Stack**: HTML/CSS/JS (prototipo) → WordPress+Elementor (migración final)
- **Environment**: XAMPP/PHP on Windows (C:\xampp\htdocs\TEST)
- **Brief**: See RK_WEB_BRIEF.md

## When to Use

- Building form handlers (demo requests, contact forms)
- Creating API endpoints for data retrieval/submission
- Implementing authentication and authorization
- Managing database queries and data persistence
- Building email notification systems
- Implementing business logic for conversions tracking
- Creating admin panels or data management interfaces
- Integrating with external services (CRM, email providers)

## Backend Architecture Guidelines

### File Organization
```
includes/
  ├── config.php          # Database and environment config
  ├── db.php              # Database connection class
  ├── handlers/           # Form/API handlers
  │   ├── demo-request.php
  │   ├── contact-form.php
  │   └── api/
  └── utils.php           # Helper functions

api/
  ├── endpoints/          # REST API endpoints
  │   ├── demo-requests.php
  │   ├── testimonials.php
  │   └── contact.php
```

### PHP Standards
- PSR-12 coding style (where applicable)
- Proper error handling with try-catch
- Input validation and sanitization
- Output escaping for security
- Database prepared statements to prevent SQL injection
- CORS headers for API calls if needed
- Proper HTTP status codes (200, 201, 400, 404, 500)

### Database Design
- Use InnoDB for transactions and foreign keys
- Normalize data (at least 3NF)
- Index frequently queried columns
- Use timestamps for audit trails (created_at, updated_at)
- Implement soft deletes when appropriate

### Security Best Practices
- Validate and sanitize all inputs (GET, POST, FILES)
- Use prepared statements for all database queries
- Escape output with htmlspecialchars() or similar
- Implement CSRF tokens for forms
- Use environment variables for sensitive config
- Hash passwords with password_hash()
- Implement rate limiting for APIs
- Log errors server-side, not to client

## Procedure

### 1. Plan the Feature
- Analyze requirements from brief (forms, CTAs, conversions)
- Identify data needed (demo requests, contact info)
- Design database schema if needed
- Plan API endpoints and response formats

### 2. Set Up Database
- Create tables with proper structure
- Add indexes on frequently searched columns
- Set up audit fields (created_at, updated_at, user_id)
- Document schema in comments

### 3. Create Database Layer
- Build database connection class (db.php)
- Create query builder or use prepared statements
- Implement error handling
- Add logging for debugging

### 4. Implement Business Logic
- Create handlers for form submissions
- Validate input data
- Process and store data
- Trigger notifications/workflows

### 5. Build API Endpoints
- Design RESTful endpoints (GET, POST, PUT, DELETE)
- Implement proper HTTP status codes
- Add input validation and error responses
- Return consistent JSON format

### 6. Integrate with Frontend
- Connect frontend forms to backend handlers
- Implement AJAX for seamless UX
- Handle success/error responses
- Implement client-side validation

### 7. Test and Monitor
- Test all endpoints with various inputs
- Verify database transactions
- Check error handling and logging
- Monitor for security issues

## Common Patterns

### Form Handler Template
```php
<?php
// includes/handlers/demo-request.php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

try {
    // Validate input
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $company = sanitize_text_field($_POST['company'] ?? '');
    
    if (!$email || !$company) {
        throw new Exception('Missing required fields');
    }
    
    // Insert to database
    $pdo->prepare('INSERT INTO demo_requests (email, company, created_at) VALUES (?, ?, NOW())')
        ->execute([$email, $company]);
    
    // Send notification
    // mail($admin_email, 'Nueva solicitud de demo', ...);
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred']);
}
```

### Database Connection Template
```php
<?php
// includes/db.php
class Database {
    private $pdo;
    
    public function __construct($dsn, $user, $pass) {
        $this->pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    
    public function query($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
}
```

### API Response Template
```php
<?php
function send_json($data, $status = 200) {
    header('Content-Type: application/json');
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Usage
send_json(['success' => true, 'data' => $result], 200);
send_json(['error' => 'Not found'], 404);
```

## Key Data Models (from Brief)

- **Demo Requests**: email, company, industry, timestamp
- **Contact Messages**: name, email, message, phone, timestamp
- **Testimonials**: client_name, role, company, quote, rating
- **Conversion Events**: type (demo_request, contact, signup), timestamp, source

## Quality Checklist

- [ ] All inputs are validated and sanitized
- [ ] Database queries use prepared statements
- [ ] Output is properly escaped
- [ ] Error handling is implemented
- [ ] Database schema is documented
- [ ] API endpoints return proper HTTP status codes
- [ ] Forms submit data successfully
- [ ] Email notifications work
- [ ] No sensitive data in logs
- [ ] Database transactions are atomic
- [ ] Code is tested and documented
