# Zalo Shop Frontend

Frontend application cho Zalo Shop sử dụng Next.js 14, TypeScript và Tailwind CSS.

## Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cài đặt thêm dependencies cần thiết

```bash
npm install lucide-react
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

## Cấu trúc Project

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles với màu cam chủ đạo
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Dashboard page
│   │   └── services/           # Service pages
│   │       ├── zalo/           # Dịch vụ Zalo
│   │       └── accounts/       # Mua tài khoản
│   └── components/
│       └── Layout/             # Layout components
│           ├── MainLayout.tsx  # Main layout wrapper
│           ├── Sidebar.tsx     # Left sidebar
│           └── Header.tsx      # Top header
├── public/                     # Static files
└── package.json
```

## Tính năng

### Layout System

- ✅ **Left Sidebar**: Navigation menu với design như yêu cầu
- ✅ **Header**: Top header với search, notifications, user menu
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Toggle Sidebar**: Ẩn/hiện sidebar

### Design System

- ✅ **Orange Theme**: Màu cam chủ đạo (#f97316)
- ✅ **Animations**: Fade, slide, scale, bounce effects
- ✅ **Custom Scrollbar**: Styled scrollbar
- ✅ **Component Library**: Buttons, cards, inputs, badges

### Pages

- ✅ **Dashboard**: Tổng quan hệ thống
- ✅ **Dịch Vụ Zalo**: Danh sách dịch vụ Zalo
- ✅ **Mua Tài Khoản**: Các loại tài khoản

## Components

### MainLayout

Layout chính bao gồm sidebar và content area.

### Sidebar

Left sidebar với:

- Logo Z với màu cam
- Navigation menu theo sections
- Active state highlighting
- Responsive design

### Header

Top header với:

- Menu toggle button
- Search bar
- Notifications
- User profile

## Styling

### Color Palette

- **Primary**: Orange (#f97316)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Animations

- `fade-in`, `fade-out`
- `slide-in-*` (right, left, up, down)
- `scale-in`, `scale-out`
- `bounce-in`
- `pulse`

### Utility Classes

- `.btn`, `.btn-primary`, `.btn-secondary`
- `.card`, `.card-header`, `.card-body`
- `.input`, `.input-error`
- `.badge`, `.badge-primary`
- `.spinner`

## Development

### Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

### Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Connect repository với Vercel
3. Deploy tự động

### Manual Build

```bash
npm run build
npm run start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- ✅ **Code Splitting**: Automatic với Next.js
- ✅ **Image Optimization**: Next.js Image component
- ✅ **Font Optimization**: Google Fonts
- ✅ **CSS Optimization**: Tailwind CSS purging
