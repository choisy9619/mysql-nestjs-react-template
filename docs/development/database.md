# Database Setup

## 🐳 MySQL with Docker

### Start MySQL Container

```bash
# Start MySQL container in background
docker-compose up -d

# Check container status
docker-compose ps

# View container logs
docker-compose logs mysql
```

### Connect to Database

```bash
# Connect via Docker (recommended for development)
docker-compose exec mysql mysql -u nestuser -p mysql_nest_react
# Password: nestpassword

# Connect from host (requires MySQL client)
mysql -h localhost -P 3306 -u nestuser -p mysql_nest_react
# Password: nestpassword

# Connect as root user
docker-compose exec mysql mysql -u root -p
# Password: rootpassword
```

## 🗃️ Database Management

### Backup & Restore

```bash
# Backup database
docker-compose exec mysql mysqldump -u root -p mysql_nest_react > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -p mysql_nest_react < backup.sql
```

### Container Management

```bash
# Stop MySQL container
docker-compose down

# Stop and remove all data (⚠️ DANGER: All data will be lost!)
docker-compose down -v

# View database files location
docker volume inspect mysql-nest-react_mysql_data
```

## 🔧 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs mysql

# Check if port is in use
lsof -i :3306

# Kill process using port 3306
kill -9 $(lsof -ti:3306)
```

### Reset Everything
```bash
# Complete reset (⚠️ All data will be lost!)
docker-compose down -v
docker system prune -f
docker-compose up -d
```

### Disk Space Issues
```bash
# Check Docker disk usage
docker system df

# Clean up unused containers and images
docker system prune -a
```

### Connection Issues
```bash
# Test connection from host
telnet localhost 3306

# Check container network
docker network ls
docker network inspect mysql-nest-react_app-network
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  displayName VARCHAR(100),
  bio TEXT,
  isVerified BOOLEAN DEFAULT FALSE,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Refresh Tokens Table (Coming Soon)
```sql
CREATE TABLE refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  userId INT NOT NULL,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔐 Environment Variables

Required environment variables for database:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=nestuser
DB_PASSWORD=nestpassword
DB_NAME=mysql_nest_react
```

## 📝 Migration Commands

```bash
# Generate migration
pnpm migration:generate

# Run migrations
pnpm migration:run

# Revert migration
pnpm migration:revert

# Show migration status
pnpm migration:show
```
