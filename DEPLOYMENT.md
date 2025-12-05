# Hướng Dẫn Triển Khai (Deployment Guide)

## Triển Khai Môi Trường Production

### Backend Deployment

#### Option 1: Deploy Backend trên VPS/Server

1. **Cài đặt môi trường:**
```bash
# Cài đặt Node.js, Docker
sudo apt update
sudo apt install nodejs npm docker.io docker-compose
```

2. **Clone và cài đặt:**
```bash
git clone <repository-url>
cd web_full_stack/backend
npm install --production
```

3. **Khởi động MongoDB:**
```bash
docker-compose up -d
```

4. **Chạy backend với PM2 (process manager):**
```bash
npm install -g pm2
pm2 start index.js --name student-api
pm2 save
pm2 startup
```

5. **Cấu hình Nginx làm reverse proxy:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Option 2: Deploy Backend trên Heroku

1. **Chuẩn bị:**
```bash
cd backend
heroku create student-management-api
```

2. **Cấu hình MongoDB Atlas:**
- Đăng ký tài khoản tại https://www.mongodb.com/cloud/atlas
- Tạo cluster miễn phí
- Lấy connection string
- Thay đổi trong index.js:
```javascript
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student_db')
```

3. **Deploy:**
```bash
git init
git add .
git commit -m "Deploy backend"
heroku config:set MONGODB_URI=<your-mongodb-atlas-uri>
git push heroku main
```

### Frontend Deployment

#### Option 1: Deploy Frontend trên Vercel/Netlify (Recommended)

1. **Build ứng dụng:**
```bash
cd student-management
npm run build
```

2. **Deploy với Vercel:**
```bash
npm install -g vercel
vercel --prod
```

3. **Hoặc deploy với Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

4. **Cập nhật API URL:**
Trong `src/components/HomePage.js` và `EditStudent.js`, thay:
```javascript
const API_URL = 'https://your-api-domain.com/api/students';
```

#### Option 2: Deploy Frontend với Nginx

1. **Build ứng dụng:**
```bash
npm run build
```

2. **Copy build folder lên server:**
```bash
scp -r build/* user@server:/var/www/student-management/
```

3. **Cấu hình Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/student-management;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Biến Môi Trường (Environment Variables)

#### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student_db
NODE_ENV=production
```

#### Frontend (.env.production)
```
REACT_APP_API_URL=https://api.yourdomain.com
```

### Docker Deployment (Full Stack)

1. **Tạo Dockerfile cho Backend:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

2. **Tạo Dockerfile cho Frontend:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

3. **Docker Compose cho toàn bộ stack:**
```yaml
version: '3'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/student_db
    depends_on:
      - mongodb

  frontend:
    build: ./student-management
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

4. **Khởi động:**
```bash
docker-compose up -d
```

### Monitoring và Bảo Trì

1. **Logs Backend:**
```bash
pm2 logs student-api
# hoặc với Docker:
docker logs -f container-name
```

2. **Backup MongoDB:**
```bash
docker exec student-mongo mongodump --out /backup
```

3. **Restore MongoDB:**
```bash
docker exec student-mongo mongorestore /backup
```

### Security Checklist

- [ ] Đổi MongoDB username/password mặc định
- [ ] Bật HTTPS với SSL certificate (Let's Encrypt)
- [ ] Cấu hình CORS chỉ cho phép domain cụ thể
- [ ] Giới hạn rate limiting cho API
- [ ] Bật firewall và chỉ mở port cần thiết
- [ ] Thường xuyên update dependencies
- [ ] Backup database định kỳ

## Testing sau khi Deploy

```bash
# Test Backend API
curl https://api.yourdomain.com/api/students

# Test Frontend
curl https://yourdomain.com
```

## Troubleshooting

### CORS Error
- Kiểm tra cấu hình CORS trong backend/index.js
- Đảm bảo domain frontend được thêm vào whitelist

### MongoDB Connection Error
- Kiểm tra MongoDB đang chạy: `docker ps`
- Kiểm tra connection string
- Verify network connectivity

### Build Error
- Xóa node_modules và cài lại: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`
