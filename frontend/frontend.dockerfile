FROM node:18-alpine
RUN npm install -gy npm@8.12.1 serve
RUN mkdir -p /app && cd /app && mkdir -p build && cd ..
WORKDIR /app
COPY frontend/build/ ./build
EXPOSE $PORT
ENV REACT_APP_API_ENDPOINT=http://ec2-34-207-66-248.compute-1.amazonaws.com:8080

# Start the app
CMD [ "serve", "-s", "-n", "build", "-l", "80" ]