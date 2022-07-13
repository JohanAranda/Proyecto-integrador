FROM openjdk:17-alpine
RUN mkdir -p /app
WORKDIR /app
COPY backend/*.jar ./app.jar
EXPOSE $PORT

CMD [ "java", "-jar", "./app.jar" ]