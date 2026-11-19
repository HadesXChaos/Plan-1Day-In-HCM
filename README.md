# Timeline 1 Ngày Tự Tùy Chỉnh

Ứng dụng web tĩnh (HTML/CSS/JS thuần, không cần build tool hay backend) cho phép tạo, chỉnh sửa, lưu trữ và xuất lịch trình 1 ngày trực quan trên máy tính và điện thoại.

## Cấu trúc thư mục

```text
timeline-1-ngay/
├── index.html      # Giao diện chính
├── css/
│   └── style.css   # Hệ thống giao diện, 5 theme, responsive & tối ưu in PDF
├── js/
│   └── app.js      # Logic CRUD, 3 mẫu nhanh, lọc danh mục, localStorage & JSON
└── README.md       # Hướng dẫn sử dụng
```

## Cách chạy nhanh

1. **Chạy trực tiếp trên máy**: Giải nén file `.zip` và mở trực tiếp `index.html` bằng trình duyệt bất kỳ (Chrome, Edge, Safari, Firefox).
2. **Triển khai lên server tĩnh (Nginx / Docker / GitHub Pages)**: Copy toàn bộ thư mục vào web root (ví dụ `/var/www/timeline/` hoặc `/usr/share/nginx/html/`) là có thể sử dụng ngay.

## Tính năng chính

- **Chỉnh sửa trực tiếp**: Tiêu đề, mô tả/địa điểm và ngày diễn ra ngay trên Header.
- **5 chủ đề màu sắc**: Xanh Đại Dương, Hoàng Hôn, Rừng Xanh, Tím Mộng Mơ và Dark Mode.
- **Quản lý mốc thời gian linh hoạt**: Thêm, sửa, xóa, nhân bản, di chuyển lên/xuống, sắp xếp tự động theo giờ, đánh dấu nổi bật và checkbox hoàn thành.
- **Tự động tính thời lượng & tiến độ**: Hiển thị tổng số mốc, khung giờ toàn ngày và thanh tiến độ %.
- **Lọc theo 7 danh mục** kèm icon SVG sắc nét.
- **3 mẫu nhanh có sẵn**: Chuyến đi/Teambuilding, Ngày làm việc hiệu suất, Cuối tuần thư giãn.
- **Lưu trữ & Xuất dữ liệu**: Tự động lưu `localStorage`, Xuất/Nhập file `.json`, Chế độ Xem trước (Preview) và In / Xuất PDF sắc nét.
