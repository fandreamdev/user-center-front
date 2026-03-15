# 第一阶段：构建 (Build)
FROM node:18-alpine AS build
WORKDIR /app

# 1. 安装依赖（利用缓存）
COPY package*.json ./
RUN npm install

# 2. 拷贝源码并编译
COPY . .
RUN npm run build

# 第二阶段：部署 (Serve)
FROM nginx:stable-alpine

# 3. 拷贝编译出来的静态文件到 Nginx 目录
# Umi 默认输出到 dist/ 目录
COPY --from=build /app/dist /usr/share/nginx/html

# 4. 拷贝自定义 Nginx 配置（解决刷新 404 和跨域问题）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 5. 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
