# Ứng Dụng Quản Lý Học Sinh - MERN Stack

Ứng dụng web quản lý học sinh được xây dựng với React (frontend), Express.js (backend), MongoDB (database) và Docker.

## Cấu Trúc Dự Án

```
web_full_stack/
├── backend/                 # Backend Express.js
│   ├── index.js            # Server chính
│   ├── Student.js          # Mongoose model
│   ├── docker-compose.yml  # Cấu hình MongoDB
│   └── package.json
└── student-management/     # Frontend React
    ├── src/
    │   ├── components/
    │   │   ├── HomePage.js     # Trang chính
    │   │   └── EditStudent.js  # Trang chỉnh sửa
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Tính Năng

### Bài 1: Hiển thị Danh sách Học sinh ✅
- Kết nối MongoDB với Docker
- API GET để lấy danh sách học sinh
- Hiển thị danh sách trên giao diện React

### Bài 2: Thêm Học sinh Mới ✅
- API POST để tạo học sinh mới
- Form nhập liệu trên frontend
- Cập nhật danh sách realtime

### Bài 3: Chỉnh Sửa Thông Tin ✅
- API PUT để cập nhật học sinh
- Trang chỉnh sửa với React Router
- Navigation giữa các trang

### Bài 4: Xóa Học sinh ✅
- API DELETE để xóa học sinh
- Xác nhận trước khi xóa
- Cập nhật UI sau khi xóa

### Bài 5: Tìm Kiếm theo Tên ✅
- Ô tìm kiếm realtime
- Lọc danh sách theo tên (không phân biệt hoa/thường)

### Bài 6: Sắp Xếp theo Tên ✅
- Nút toggle sắp xếp A→Z / Z→A
- Sắp xếp client-side

## Hướng Dẫn Cài Đặt

### Yêu Cầu
- Node.js (v14+)
- Docker và Docker Compose
- npm hoặc yarn

### Bước 1: Cài Đặt Backend

```bash
cd backend
npm install
```

### Bước 2: Khởi Động MongoDB

```bash
cd backend
docker-compose up -d
```

Kiểm tra MongoDB đang chạy:
```bash
docker ps
```

### Bước 3: Khởi Động Backend Server

```bash
cd backend
npm start
```

Backend sẽ chạy tại: http://localhost:5000

### Bước 4: Cài Đặt Frontend

```bash
cd student-management
npm install
```

### Bước 5: Khởi Động Frontend

```bash
cd student-management
npm start
```

Frontend sẽ chạy tại: http://localhost:3000

## API Endpoints

### Students API

- **GET** `/api/students` - Lấy danh sách tất cả học sinh
- **GET** `/api/students/:id` - Lấy thông tin một học sinh
- **POST** `/api/students` - Tạo học sinh mới
  ```json
  {
    "name": "Nguyễn Văn An",
    "age": 20,
    "class": "CNTT-K62"
  }
  ```
- **PUT** `/api/students/:id` - Cập nhật thông tin học sinh
- **DELETE** `/api/students/:id` - Xóa học sinh

## Schema Học Sinh

```javascript
{
  name: String,     // Bắt buộc
  age: Number,      // Bắt buộc
  class: String     // Bắt buộc
}
```

## Sử Dụng

1. **Thêm học sinh mới**: Điền thông tin vào form "Thêm Học Sinh Mới" và nhấn nút "Thêm học sinh"

2. **Tìm kiếm**: Gõ tên học sinh vào ô "Tìm kiếm theo tên..." để lọc danh sách

3. **Sắp xếp**: Nhấn nút "Sắp xếp theo tên" để đảo thứ tự A→Z hoặc Z→A

4. **Sửa thông tin**: Nhấn nút "Sửa" trên dòng học sinh cần chỉnh sửa

5. **Xóa học sinh**: Nhấn nút "Xóa" và xác nhận để xóa học sinh khỏi hệ thống

## Dừng Ứng Dụng

### Dừng Frontend và Backend
Nhấn `Ctrl + C` trong terminal đang chạy

### Dừng MongoDB
```bash
cd backend
docker-compose down
```

## Xử Lý Lỗi Thường Gặp

### Lỗi kết nối MongoDB
- Kiểm tra Docker container đang chạy: `docker ps`
- Khởi động lại: `docker-compose restart`

### Lỗi CORS
- Đảm bảo backend đã cài đặt và cấu hình `cors` middleware

### Port đã được sử dụng
- Thay đổi port trong `backend/index.js` (PORT) hoặc frontend `package.json`

## Công Nghệ Sử Dụng

- **Frontend**: React, React Router, Axios
- **Backend**: Express.js, Mongoose
- **Database**: MongoDB
- **Container**: Docker, Docker Compose

## Tác Giả

Bài thực hành xây dựng ứng dụng quản lý học sinh - MERN Stack

## License

MIT