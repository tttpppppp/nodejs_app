# NodeJS Train

Dự án NodeJS (TypeScript + Express + MongoDB)

## Thông tin

- **Tên dự án**: `nodejs_train`
- **Version**: 1.0.0
- **Mô tả**: NodeJS training project sử dụng Express, TypeScript, JWT, MongoDB.

## Cấu trúc chính

- **Main entry**: `src/server.ts`
- **Framework**: Express 5
- **Database**: MongoDB (Mongoose)
- **Ngôn ngữ**: TypeScript

## Scripts

| Lệnh            | Mô tả                          |
| --------------- | ------------------------------ |
| `npm run dev`   | Chạy server với ts-node (dev)  |
| `npm run start` | Chạy server với nodemon        |
| `npm run build` | Build TypeScript ra JavaScript |

## Dependencies (Runtime)

- `express` – Web framework
- `cors` – CORS middleware
- `helmet` – Bảo mật HTTP headers
- `morgan` – Logger middleware
- `dotenv` – Quản lý biến môi trường
- `envalid` – Validate biến môi trường
- `winston` – Logging
- `bcryptjs` – Hash password
- `jsonwebtoken` – JWT auth
- `gravatar` – Avatar từ email
- `class-transformer` – Transform plain object → class
- `class-validator` – Validation DTO
- `tsconfig-paths` – Hỗ trợ alias path trong TS
- `http` – HTTP lib (mặc định)

## Dev Dependencies (Development)

- `typescript` – Ngôn ngữ TypeScript
- `ts-node` – Chạy TypeScript trực tiếp
- `nodemon` – Tự động reload khi code thay đổi
- `@types/express` – TypeScript types cho Express
- `@types/mongoose` – Types cho Mongoose
- `@types/jsonwebtoken` – Types cho JWT
- `@types/morgan` – Types cho Morgan
- `@types/cors` – Types cho CORS
- `@types/bcryptjs` – Types cho BcryptJS
- `@types/gravatar` – Types cho Gravatar

## Cách chạy

1. Cài dependencies:
   ```bash
   npm install
   ```
